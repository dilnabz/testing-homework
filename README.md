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
$env:BUG_ID="7"; npm run test:unit testingCatalog.test.tsx – файл, который хотетите протестировать.

Пожалуйста, проверяйте каждый unit-тест отдельно, добавляя к it - .only, а то они вместе падают ☹
Пойманные баги:
Bug 1 – можно поймать с помощью теста productCardInCatalogHasName.hermione.js (нет названий товаров в каталоге).
Bug 2 – можно поймать с помощью теста isValidIdInFormData.hermione.js (номер заказа длиной больше 6 символов).
Bug 3 – можно поймать с помощью теста ProductIdsEqualToZero.hermione.js (на странице товара с id=1 будет пусто).
Bug 4 – можно поймать с помощью теста checkingHamburgerMenu.hermione.js (меню не скрывается за гамбургер-меню).
Bug 5 – можно поймать с помощью теста checkingCartForm.hermione.js (не будет работать кнопка checkout и не появится надпись Well Done! – на скриншоте это будет видно).
Bug 6 – непонятно, что багается.
Bug 7 – можно поймать с помощью unit-теста «Кнопка «добавить в корзину» должна добавлять в корзину товар» в файле testingCatalog.test.tsx.(товар в карточку не добавляется).
Bug 8 – можно поймать с помощью теста checkingCartForm.hermione.js (поле с надписью Well Done! Окрасится в красный – на скриншоте это будет видно).

Bug 9 – можно поймать с помощью теста карточки продукта checkingIsProductPageAdaptive.hermione.js (там кнопка маленького размера и скриншоты не совпадают).
Bug 10 – можно поймать с помощью теста checkingCartForm.hermione.js (поле ввода номера телефона будет постоянно невалидным – на скриншоте это будет видно).

