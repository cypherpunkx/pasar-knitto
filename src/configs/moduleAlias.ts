import moduleAlias from 'module-alias';
import path from 'path';

// Register multiple aliases
moduleAlias.addAliases({
  '@': path.join(process.cwd(), 'dist'),
});

moduleAlias();
