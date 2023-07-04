## Как запустить

```sh
# установите зависимости
npm ci

# соберите клиентский код приложения
npm run build

# запустите сервер
npm start
```

После этого можете открыть приложение в браузере по адресу http://localhost:3000/hw/store

Если не запускается приложение, пожалуйста, используйте дефолтный tsconfig файл, а то я его меняла в своем проекте.
По любым вопросам можно обращаться ко мне в телегу: @dilnabz в любое время!

Версия node 16.20.1
Система Widows10 x64

В hermione.conf.js добавлено:
windowSize: {
        width: 1920,
        height: 1080,
      },

В jest.config.js добавлено:

setupFilesAfterEnv: ["<rootDir>/setupTests.js"],

В tsconfig.json добавлено:
"types": ["@testing-library/jest-dom"]

Создан файл setupTests.js и в нем лежит:
require('@testing-library/jest-dom/extend-expect');

Запуск сервера с багом (чтобы тестировать на гермионе):
$env:BUG_ID=”4”; npm start;
Затем в корневом каталоге запускаем npx hermione gui;

Запуск unit-тестов с багом:
Переходим в папку с юнит тестами и в терминале набираем:
$env:BUG_ID="7"; npm run test:unit testingCatalog.test.tsx – файл, который хотите протестировать.

