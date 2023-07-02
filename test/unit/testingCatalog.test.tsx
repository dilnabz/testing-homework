import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { initStore } from "../../src/client/store";
import { render } from "@testing-library/react";
import { CartApi, ExampleApi } from "../../src/client/api";
import { Store } from "redux";
import { Catalog } from "../../src/client/pages/Catalog";
import { Application } from "../../src/client/Application";
import { Cart } from "../../src/client/pages/Cart";
import {  waitFor, fireEvent, screen } from '@testing-library/dom';

//Пожалуйста, проверяйте каждый тест отдельно, добавляя к it - .only
describe("Тестирование каталога", () => {
    it.only("в каталоге должны отображаться товары, список которых приходит с сервера, для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре", async () => {
        const basename = "./hw/store";
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store: Store = initStore(api, cart);

        api.getProducts = async () => {
            return {
                status: 200,
                statusText: "",
                headers: {},
                config: {},
                data: [
                    {
                        id: 1,
                        name: "Product_A",
                        price: 100,
                    },
                    {
                        id: 2,
                        name: "Product_B",
                        price: 220,
                    }
                ],
            };
        };

        const catalog = (
            // @ts-ignore
            <MemoryRouter ><Provider store={store}><Catalog /></Provider>
            </MemoryRouter>);
    
        const { getByRole, getByText, getAllByRole } = render(catalog);

        await waitFor(() => {
            expect(getByRole("heading", { name: "Product_A" })).toBeInTheDocument();
            expect(getByRole("heading", { name: "Product_B" })).toBeInTheDocument();
            expect(getByText("$100")).toBeInTheDocument();
            expect(getByText("$220")).toBeInTheDocument();
            expect(getAllByRole("link", { name: "Details" })).toHaveLength(2);
        });
    }),
    it("на странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка добавить в корзину", async() => {
        const basename = "./hw/store";
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store: Store = initStore(api, cart);

        api.getProducts = async () => {
            return {
                status: 200,
                statusText: "",
                headers: {},
                config: {},
                data: [
                    {
                        id: 1,
                        name: "Product_A",
                        price: 100,
                    },
                ],
            };
        };

        api.getProductById = async() => {
            return {
                status: 200,
                statusText: "",
                headers: {},
                config: {},
                data: {
                    id: 1,
                    name: "Product_A",
                    price: 100,
                    description: "Description: description of Product_A",
                    material: "Material: material of Product_A",
                    color: "Color: blue",
                },
            }
        }

        const application = (
            // @ts-ignore
            <MemoryRouter initialEntries={["/catalog/1"]}><Provider store={store}><Application /></Provider>
            </MemoryRouter>);
    
        const { getByRole, getByText } = render(application);
        
        await waitFor(() => {
            expect(getByRole("heading", { name: "Product_A" })).toBeInTheDocument();
            expect(getByText("$100")).toBeInTheDocument();
            expect(getByText("Description: description of Product_A")).toBeInTheDocument();
            expect(getByText("Material: material of Product_A")).toBeInTheDocument();
            expect(getByText("Color: blue")).toBeInTheDocument();
            expect(getByRole("button", { name: "Add to Cart" })).toBeInTheDocument();
        });
    }),
    it("если товар уже добавлен в корзину, в каталоге и на странице товара должно отображаться сообщение об этом", async() => {
        const basename = "./hw/store";
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store: Store = initStore(api, cart);

        api.getProducts = async () => {
            return {
                status: 200,
                statusText: "",
                headers: {},
                config: {},
                data: [
                    {
                        id: 1,
                        name: "Product_A",
                        price: 100,
                    },
                ],
            };
        };

        api.getProductById = async() => {
            return {
                status: 200,
                statusText: "",
                headers: {},
                config: {},
                data: {
                    id: 1,
                    name: "Product_A",
                    price: 100,
                    description: "Description: description of Product_A",
                    material: "Material: material of Product_A",
                    color: "Color: blue",
                },
            }
        }

        store.dispatch({
            type: "ADD_TO_CART",
            product: {
                id: 1,
                name: "Product_A",
                price: 100,
            }
          });
        const catalog = (
            // @ts-ignore
            <MemoryRouter><Provider store={store}><Catalog /></Provider>
            </MemoryRouter>);
    
        const { findByText } = render(catalog);
        const itemInCart = await findByText("Item in cart");

        expect(itemInCart).toBeInTheDocument();

        const application = (
            // @ts-ignore
            <MemoryRouter initialEntries={["/catalog/1"]}><Provider store={store}><Application /></Provider>
            </MemoryRouter>);
    
        const { getByText} = render(application);
        
        await waitFor(() => {
            expect(getByText("Item in cart")).toBeInTheDocument();
        });       
    }),
    it("если товар уже добавлен в корзину, повторное нажатие кнопки добавить в корзину должно увеличивать его количество", async() => {
        const basename = "./hw/store";
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store: Store = initStore(api, cart);

        api.getProducts = async () => {
            return {
                status: 200,
                statusText: "",
                headers: {},
                config: {},
                data: [
                    {
                        id: 1,
                        name: "Product_A",
                        price: 100,
                    },
                ],
            };
        };

        api.getProductById = async() => {
            return {
                status: 200,
                statusText: "",
                headers: {},
                config: {},
                data: {
                    id: 1,
                    name: "Product_A",
                    price: 100,
                    description: "Description: description of Product_A",
                    material: "Material: material of Product_A",
                    color: "Color: blue",
                },
            }
        }

        store.dispatch({
            type: "ADD_TO_CART",
            product: {
                id: 1,
                name: "Product_A",
                price: 100,
            }
          });

        const application = (
            // @ts-ignore
            <MemoryRouter initialEntries={["/catalog/1"]}><Provider store={store}><Application /></Provider>
            </MemoryRouter>);
    
        const { getByRole } = render(application);

        await waitFor(() => {
            const addBtn = getByRole("button", {name: "Add to Cart"});
        
            fireEvent.click(addBtn);
            fireEvent.click(addBtn);
        }, {timeout:2000});

        const card = (// @ts-ignore
            <MemoryRouter><Provider store={store}><Cart /></Provider>
            </MemoryRouter>)
        const { getByText, getAllByText } = render(card);

        await waitFor(() => {
            expect(getByText("3")).toBeInTheDocument();
            expect(getAllByText("$300")).toHaveLength(2);
        },{timeout:4000}); 
    }),
    it("Кнопка добавить в корзину должна добавлять в корзину товар", async() => {
        const basename = "./hw/store";
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store: Store = initStore(api, cart);

        api.getProducts = async () => {
            return {
                status: 200,
                statusText: "",
                headers: {},
                config: {},
                data: [
                    {
                        id: 1,
                        name: "Product_A",
                        price: 100,
                    },
                ],
            };
        };

        api.getProductById = async() => {
            return {
                status: 200,
                statusText: "",
                headers: {},
                config: {},
                data: {
                    id: 1,
                    name: "Product_A",
                    price: 100,
                    description: "Description: description of Product_A",
                    material: "Material: material of Product_A",
                    color: "Color: blue",
                },
            }
        }

        const application = (
            // @ts-ignore
            <MemoryRouter initialEntries={["/catalog/1"]}><Provider store={store}><Application /></Provider>
            </MemoryRouter>);
    
        const { getByRole } = render(application);

        await waitFor(() => {
            const addBtn = getByRole("button", {name: "Add to Cart"});
        
            fireEvent.click(addBtn);
            fireEvent.click(addBtn);
        }, {timeout:1000});

        const card = (// @ts-ignore
            <MemoryRouter><Provider store={store}><Cart /></Provider>
            </MemoryRouter>)
        const { getByText, getAllByText } = render(card);
        screen.debug()

        await waitFor(() => {
            expect(getByText("2")).toBeInTheDocument();
            expect(getAllByText("$200")).toHaveLength(2);
        },{timeout:2000}); 
    }),
    it("Содержимое корзины должно сохраняться между перезагрузками страницы", async() => {
        const basename = "./hw/store";
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store: Store = initStore(api, cart);

        api.getProductById = async() => {
            return {
                status: 200,
                statusText: "",
                headers: {},
                config: {},
                data: {
                    id: 1,
                    name: "Product_A",
                    price: 100,
                    description: "Description: description of Product_A",
                    material: "Material: material of Product_A",
                    color: "Color: blue",
                },
            }
        }

        store.dispatch({
            type: "ADD_TO_CART",
            product: {
                id: 1,
                name: "Product_A",
                price: 100,
            }
          });

        const application = (
            // @ts-ignore
            <MemoryRouter initialEntries={["/catalog/1"]}><Provider store={store}><Application /></Provider>
            </MemoryRouter>);
    
        const { rerender, getByText } = render(application);

        rerender(application);

        await waitFor(() => {
            expect(getByText("Item in cart")).toBeInTheDocument();
        }, {timeout:2000});

    })
})