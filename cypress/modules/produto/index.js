class Produto {
    VisualizarProduto() {
        cy.get('a[href="/product_details/1').should('be.visible').click()
    }

    buscarProduto() {
        cy.get('input#search_product').type('Men Tshirt')
        cy.get('#submit_search').click()
    }

    adicionarProduto() {
        cy.get('[data-product-id="2"]').contains('Add to cart').click()
    }
}

export default new Produto()
