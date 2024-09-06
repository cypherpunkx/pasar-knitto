import moduleAlias from 'module-alias';
import path from 'path';

moduleAlias.addAliases({
  '@app': path.join(process.cwd(), 'src', 'app'),
  '@controllers': path.join(process.cwd(), 'src', 'app', 'controllers'),
  '@models': path.join(process.cwd(), 'src', 'models'),
  '@schemas': path.join(process.cwd(), 'src', 'schemas'),
  '@middlewares': path.join(process.cwd(), 'src', 'app', 'middlewares'),
  '@repositories': path.join(process.cwd(), 'src', 'app', 'repositories'),
  '@services': path.join(process.cwd(), 'src', 'app', 'services'),
  '@routes': path.join(process.cwd(), 'src', 'app', 'routes'),
  '@configs': path.join(process.cwd(), 'src', 'configs'),
  '@constants': path.join(process.cwd(), 'src', 'constants'),
  '@libs': path.join(process.cwd(), 'src', 'libs'),
  '@utils': path.join(process.cwd(), 'src', 'utils'),
});

moduleAlias();
