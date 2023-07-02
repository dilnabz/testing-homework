import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { initStore } from "../../src/client/store";
import { render } from "@testing-library/react";
import { CartApi, ExampleApi } from "../../src/client/api";
import { Store } from "redux";
import { Cart } from "../../src/client/pages/Cart";
import { Application } from "../../src/client/Application";
import { waitFor, fireEvent } from '@testing-library/dom'
import userEvent from '@testing-library/user-event';


//Пожалуйста, проверяйте каждый тест отдельно, добавляя к it - .only
describe("Тестирование корзины", () => {
    it("в шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней", () => {
        const basename = "./hw/store";
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store: Store = initStore(api, cart);
      
        store.dispatch({
          type: "ADD_TO_CART",
          product: {
              id: 1,
              name: "Product_A",
              price: 111,
          }
        });
        store.dispatch({
            type: "ADD_TO_CART",
            product: {
                id: 1,
                name: "Product_A",
                price: 111,
            }
          });
        store.dispatch({
            type: "ADD_TO_CART",
            product: {
                id: 2,
                name: "Product_B",
                price: 112,
            }
          });
    
        const application = (
            // @ts-ignore
            <MemoryRouter><Provider store={store}><Application /></Provider>
            </MemoryRouter>);

        const { getByRole } = render(application);

        expect(getByRole('link', { name: /Cart \(2\)/i})).toBeInTheDocument();
    }),
    it("в корзине должна отображаться таблица с добавленными в нее товарами", () => {
        const basename = "./hw/store";
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store: Store = initStore(api, cart);
      
        store.dispatch({
            type: "ADD_TO_CART",
            product: {
                id: 3,
                name: "Product_C",
                price: 120,
            }
        });
        store.dispatch({
            type: "ADD_TO_CART",
            product: {
                id: 4,
                name: "Product_D",
                price: 130,
            }
        });
    
        const card = (
            // @ts-ignore
            <MemoryRouter><Provider store={store}><Cart /></Provider>
            </MemoryRouter>);

        const { getByText } = render(card);
        
        expect(getByText("Product_C")).toBeInTheDocument();
        expect(getByText("Product_D")).toBeInTheDocument();
    }),
    it("для каждого товара должны отображаться название, цена, количество , стоимость, а также должна отображаться общая сумма заказа", () => {
        const basename = "./hw/store";
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store: Store = initStore(api, cart);
      
        store.dispatch({
            type: "ADD_TO_CART",
            product: {
                id: 5,
                name: "Product_E",
                price: 140,
            }
        });
        store.dispatch({
            type: "ADD_TO_CART",
            product: {
                id: 5,
                name: "Product_E",
                price: 140,
            }
        });
        store.dispatch({
            type: "ADD_TO_CART",
            product: {
                id: 5,
                name: "Product_E",
                price: 140,
            }
        });
        store.dispatch({
            type: "ADD_TO_CART",
            product: {
                id: 6,
                name: "Product_F",
                price: 150,
            }
        });
        store.dispatch({
            type: "ADD_TO_CART",
            product: {
                id: 6,
                name: "Product_F",
                price: 150,
            }
        });
        store.dispatch({
            type: "ADD_TO_CART",
            product: {
                id: 6,
                name: "Product_F",
                price: 150,
            }
        });
        store.dispatch({
            type: "ADD_TO_CART",
            product: {
                id: 6,
                name: "Product_F",
                price: 150,
            }
        });
    
        const card = (
            // @ts-ignore
            <MemoryRouter><Provider store={store}><Cart /></Provider>
            </MemoryRouter>);

        const { getByText } = render(card);
        
        expect(getByText('Product_E')).toBeInTheDocument();
        expect(getByText('$140')).toBeInTheDocument();
        expect(getByText('3')).toBeInTheDocument();
        expect(getByText('$420')).toBeInTheDocument();

        expect(getByText('Product_F')).toBeInTheDocument();
        expect(getByText('$150')).toBeInTheDocument();
        expect(getByText('4')).toBeInTheDocument();
        expect(getByText('$600')).toBeInTheDocument();

        expect(getByText('$1020')).toBeInTheDocument();
    }),
    it("в корзине должна быть кнопка очистить корзину, по нажатию на которую все товары должны удаляться; если корзина пустая, должна отображаться ссылка на каталог товаров", async() => {
        const basename = "./hw/store";
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store: Store = initStore(api, cart);
      
        store.dispatch({
            type: "ADD_TO_CART",
            product: {
                id: 3,
                name: "Product_C",
                price: 120,
            }
        });
        store.dispatch({
            type: "ADD_TO_CART",
            product: {
                id: 4,
                name: "Product_D",
                price: 130,
            }
        });
        const card = (
            // @ts-ignore
            <MemoryRouter><Provider store={store}><Cart /></Provider>
            </MemoryRouter>);

        const { getByRole } = render(card);

        const clearBtn = getByRole("button", {name: "Clear shopping cart"});

        fireEvent.click(clearBtn);

        await waitFor(() => {
            const catalogLink = getByRole("link", {name: "catalog"});
            expect(catalogLink.getAttribute("href")).toBe("/catalog");
        },  { timeout: 3000 });

    })
});

 