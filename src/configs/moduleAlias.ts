import moduleAlias from 'module-alias';
import path from 'path';

moduleAlias.addAliases({
  '@app': path.join(process.cwd(), 'src', 'app'),
  '@controllers': path.join(process.cwd(), 'src', 'app', 'controllers'),
  '@services': path.join(process.cwd(), 'src', 'app', 'services'),
  '@repositories': path.join(process.cwd(), 'src', 'app', 'repositories'),
  '@routes': path.join(process.cwd(), 'src', 'app', 'routes'),
  '@middlewares': path.join(process.cwd(), 'src', 'app', 'middlewares'),
  '@configs': path.join(process.cwd(), 'src', 'configs'),
  '@models': path.join(process.cwd(), 'src', 'models'),
  '@schemas': path.join(process.cwd(), 'src', 'schemas'),
  '@utils': path.join(process.cwd(), 'src', 'utils'),
});

moduleAlias();
