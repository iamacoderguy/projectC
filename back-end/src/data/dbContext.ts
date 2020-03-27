import mongoose, { Connection, Document, Model, ClientSession, Collection } from 'mongoose';
import { ConnectionHooks } from './connectionHooks';
import config from '../config';
import uuid from 'uuid/v4';
import { modelDefs } from './models';
import { typedModel } from 'ts-mongoose';

interface ClientSessionContainer {
  id: string;
  session: ClientSession;
}

export class DbContext {
  private connection?: Connection;
  private sessions: Map<string, ClientSession> = new Map();
  private collections: Map<string, Collection> = new Map();

  public async connect(hooks?: ConnectionHooks): Promise<DbContext> {
    this.connection = await this.createConnection(hooks || {});
    const models = modelDefs();
    for (const model of models) {
      typedModel(model.name, model.schema);
    }

    return this;
  }

  private async createConnection(hooks: ConnectionHooks): Promise<Connection> {
    const connection = mongoose.connection;

    connection.on('connecting', () => {
      if (hooks.onConnecting) {
        hooks.onConnecting();
      }
    });

    connection.on('connected', () => {
      if (hooks.onConnected) {
        hooks.onConnected();
      }
    });

    connection.once('open', () => {
      if (hooks.onOpen) {
        hooks.onOpen();
      }
    });

    connection.on('disconnecting', () => {
      if (hooks.onDisconnecting) {
        hooks.onDisconnecting();
      }
    });

    connection.on('disconnected', () => {
      if (hooks.onDisconnected) {
        hooks.onDisconnected();
      }
    });

    connection.on('close', () => {
      if (hooks.onClose) {
        hooks.onClose();
      }
    });

    connection.on('reconnected', () => {
      if (hooks.onReconnected) {
        hooks.onReconnected();
      }
    });

    connection.on('error', (error) => {
      if (hooks.onError) {
        hooks.onError(error);
      }
    });

    await mongoose.connect(config.dbConfig.connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      connectTimeoutMS: config.dbConfig.connectTimeoutInMs,
    });

    return connection;
  }

  public model<T extends Document>(name: string): Model<T> {
    if (!this.connection) {
      throw new Error(`No connection found. The ${nameof(DbContext)} should be connected first.`);
    }

    return this.connection.model(name);
  }

  public async collectionExists(name: string): Promise<boolean> {
    if (!this.connection) {
      throw new Error(`No connection found. The ${nameof(DbContext)} should be connected first.`);
    }

    if (this.collections.has(name)) {
      return true;
    }

    const collections = await this.connection.db.listCollections({ name }).toArray();
    if (collections && collections.length > 0) {
      this.collections.set(name, collections[0]);
      return true;
    }

    return false;
  }

  public getDBName(): string {
    if (!this.connection) {
      throw new Error(`No connection found. The ${nameof(DbContext)} should be connected first.`);
    }

    return this.connection.db.databaseName;
  }

  public async startTransaction(): Promise<ClientSessionContainer> {
    if (!this.connection) {
      throw new Error(`No connection found. The ${nameof(DbContext)} should be connected first.`);
    }

    const session = await this.connection.startSession({
      defaultTransactionOptions: {
        readConcern: { level: 'snapshot' },
        writeConcern: { w: 1 },
      },
    });

    session.startTransaction();

    const id = uuid();
    this.sessions.set(id, session);
    return { id, session };
  }

  public async commitTransaction(id: string): Promise<void> {
    if (!this.sessions.has(id)) {
      return;
    }

    await (this.sessions.get(id) as ClientSession).commitTransaction();
  }

  public async rollbackTransaction(id: string): Promise<void> {
    if (!this.sessions.has(id)) {
      return;
    }

    await (this.sessions.get(id) as ClientSession).abortTransaction();
  }

  public disposeTransaction(id: string): void {
    if (!this.sessions.has(id)) {
      return;
    }

    (this.sessions.get(id) as ClientSession).endSession();
    this.sessions.delete(id);
  }
}
