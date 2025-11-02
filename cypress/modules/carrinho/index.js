import { faker } from '@faker-js/faker'

class Carrinho{
    navegarParaCarrinho() {
        cy.get('.modal-body a[href="/view_cart"]').click()
    }

    clicarCheckout() {
        cy.get('.btn-default.check_out').click()
    }

    digitarDescricao() {
        cy.get('#ordermsg .form-control').type('Compra T-Shirt')
    }
    
    realizarPagamento(){
        cy.get('a[href="/payment"]').click()
        cy.get('[data-qa="name-on-card"]').type(faker.finance.accountName())
        cy.get('[data-qa="card-number"]').type(faker.finance.accountNumber())
        cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV())
        cy.get('[data-qa="expiry-month"]').type('12')
        cy.get('[data-qa="expiry-year"]').type('2031')
        cy.get('[data-qa="pay-button"]').click()
    }
}

export default new Carrinho()