import app from './app';
import { getRedisClient } from './config/redis';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Conectar ao Redis
    await getRedisClient();
    console.log('Redis funcionou');

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();
