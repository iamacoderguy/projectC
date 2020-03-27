import 'reflect-metadata';
import { DependencyContainer } from 'tsyringe';
import { DbContext } from './dbContext';

function install(container: DependencyContainer): void {
  container
    .registerSingleton<DbContext>(DbContext);
}

export const installer = {
  install,
};
