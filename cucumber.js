module.exports = {
    default: {
      requireModule: ['ts-node/register'],
      require: ['tests/steps/*.ts'], // Caminho para a tua pasta de steps
      paths: ['tests/features/*.feature'], // Caminho para as tuas user stories
      format: ['html:reports/cucumber-report.html'],
      publishQuiet: true
    }
  }