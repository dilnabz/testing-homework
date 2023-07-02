import React from 'react';
import { render } from '@testing-library/react';
import { Home } from "../../src/client/pages/Home";
import { Delivery } from "../../src/client/pages/Delivery";
import { Contacts } from "../../src/client/pages/Contacts";

describe("страницы главная, условия доставки, контакты должны иметь статическое содержимое", () => {
    it("главная страница имеет статическое содержимое", () => {
        const {getByText} = render(<Home />);
        expect(getByText("Welcome to Example store!")).toBeInTheDocument();
        expect(getByText("Culpa perspiciatis corporis facilis fugit similique")).toBeInTheDocument();
        expect(getByText("Cum aut ut eveniet rem cupiditate natus veritatis quia")).toBeInTheDocument();
        expect(getByText("Quickly")).toBeInTheDocument();
        expect(getByText("Odio aut assumenda ipsam amet reprehenderit. Perspiciatis qui molestiae qui tempora quisquam")).toBeInTheDocument();
        expect(getByText("Qualitatively")).toBeInTheDocument();
        expect(getByText("Ut nisi distinctio est non voluptatem. Odio aut assumenda ipsam amet reprehenderit")).toBeInTheDocument();
        expect(getByText("Inexpensive")).toBeInTheDocument();
        expect(getByText("Perspiciatis qui molestiae qui tempora quisquam. Ut nisi distinctio est non voluptatem")).toBeInTheDocument();
        expect(getByText("Sed voluptatum quis voluptates laudantium incidunt laudantium. Illo non quos eos vel ipsa. Explicabo itaque est optio neque rerum provident enim qui sed. Corrupti commodi voluptatem vero soluta hic.")).toBeInTheDocument();
        expect(getByText("Modi corporis consectetur aliquid sit cum tenetur enim. Sed voluptatum quis voluptates laudantium incidunt laudantium. Illo non quos eos vel ipsa. Explicabo itaque est optio neque rerum provident enim qui sed. Corrupti commodi voluptatem vero soluta hic.")).toBeInTheDocument();
    }),
    it("Страница доставки имеет статическое содержимое", () => {
        const {getByText} = render(<Delivery />);
        expect(getByText("Deserunt occaecati tempora. Qui occaecati est aliquam. Enim qui nulla ipsam. Incidunt impedit enim consequuntur amet at consequuntur vero. Dolor et ad facere asperiores iste est praesentium quaerat iure. Quibusdam mollitia autem quos voluptas quia est doloremque corporis et. Sed fuga quasi esse perspiciatis fugit maxime. Qui quidem amet.")).toBeInTheDocument();
        expect(getByText("Dolores magnam consequatur iste aliquam qui sint non ab. Culpa saepe omnis. Recusandae vel aperiam voluptates harum. Perspiciatis qui molestiae qui tempora quisquam. Mollitia voluptatum minus laboriosam. Dolor maiores possimus repudiandae praesentium hic eos. Veritatis et repellat.")).toBeInTheDocument();
        expect(getByText("Pariatur nisi nobis hic ut facilis sunt rerum id error. Soluta nihil quisquam quia rerum illo. Ipsam et suscipit est iure incidunt quasi et eum. Culpa libero dignissimos recusandae. In magni sapiente non voluptas molestias. Deserunt quos quo placeat sunt. Ea necessitatibus dolores eaque ex aperiam sunt eius. Saepe aperiam aut. Quaerat natus consequatur aut est id saepe et aut facilis.")).toBeInTheDocument();
    }),
    it("Страница контактов имеет статическое содержимое", () => {
        const {getByText} = render(<Contacts />);
        expect(getByText("Ut non consequatur aperiam ex dolores. Voluptatum harum consequatur est totam. Aut voluptatum aliquid aut optio et ea. Quaerat et eligendi minus quasi. Culpa voluptatem voluptatem dolores molestiae aut quos iure. Repellat aperiam ut aliquam iure. Veritatis magnam quisquam et dolorum recusandae aut.")).toBeInTheDocument();
        expect(getByText("Molestias inventore illum architecto placeat molestias ipsam facilis ab quo. Rem dolore cum qui est reprehenderit assumenda voluptatem nisi ipsa. Unde libero quidem. Excepturi maiores vel quia. Neque facilis nobis minus veniam id. Eum cum eveniet accusantium molestias voluptas aut totam laborum aut. Ea molestiae ullam et. Quis ea ipsa culpa eligendi ab sit ea error suscipit. Quia ea ut minus distinctio quam eveniet nihil. Aut voluptate numquam ipsa dolorem et quas nemo.")).toBeInTheDocument();
    })
})


