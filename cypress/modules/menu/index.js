class Menu {
    navegarParaLogin() {
        cy.get('a[href="/login"]').click()
    }

    efetuarLogout() {
        cy.get('a[href="/logout"]').should('be.visible').click()
    }

    navegarPaginaProduto() {
        cy.get('a[href="/products"]').should('be.visible').click()
    }
}

export default new Menu()