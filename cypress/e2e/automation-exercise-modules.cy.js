
/// <reference types="cypress" />

import userData from '../fixtures/dadosUsuario.json'

import menu from '../modules/menu'
import login from '../modules/login' 
import cadastro from '../modules/cadastro'
import contato from '../modules/contato'
import produto from '../modules/produto'
import carrinho from '../modules/carrinho'

describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.viewport('iphone-xr')
        cy.visit('https://automationexercise.com')
    });

    it('1 - Cadastrar um usuário', () => {
        menu.navegarParaLogin()

        // preencher pré formulario
        login.preencherFormularioDePreCadastro() 
       
        // preencher formulario completo
        cadastro.preencherFormularioDeCadastroCompleto()
  
        // Assert
        cy.url().should('includes', 'account_created')
        cy.contains('b','Account Created!') //usar visible aqui fica redundante
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!')
    })


    // qa-tester-1760396019529@test.com

    it('2 - Login de usuário com email e senha corretos', () => {
        // Arrange
        menu.navegarParaLogin()

        // Act
        login.preencherFormularioDeLogin(userData.email, userData.password)

        // Assert
        cy.get('.fa-user').parent().should('contain', userData.name)
        cy.get('a[href="/logout"]').should('be.visible')
    })

    it('3 - Login de usuário com email e senha incorretos', () => {
        // Arrange
        menu.navegarParaLogin()

        // Act
        login.preencherFormularioDeLogin(userData.email, '54321')

        // Assert
        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')
    })

    it('4 - Logout de usuario', () => {
        // Arrange
        menu.navegarParaLogin()

        // Act
        login.preencherFormularioDeLogin(userData.email, userData.password)

        // Assert
        cy.get('i.fa-user').parent().should('contain', `Logged in as ${userData.name}`)

        //Act
        menu.efetuarLogout()

        // Assert
        cy.url().should('contain', 'login')
        cy.contains('Login to your account')
        cy.get('a[href="/logout"]').should('not.exist')
        cy.get('a[href="/login"]').should('contain','Signup / Login')
    })


    it('5 - Cadastrar usuario com email existente', () => {
        // Arrange
        menu.navegarParaLogin()

        // Act
        login.preencherFormularioDePreCadastroComEmailExistente(userData.name,userData.email)

        //Assert
        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')
    })

    it('6 - Preencher formulario Contact us com upload de arquivo', () => {
        // Act
        contato.preencherFormularioContactUs()

        //Assert
        cy.get('.status').should('be.visible')
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')
    })

    it('8 - Verificar as paginas Todos produtos e Detalhes do produto', () => {
        // Arrange
        menu.navegarParaLogin()
        login.preencherFormularioDeLogin(userData.email, userData.password)
        menu.navegarPaginaProduto()
        
        // Assert
        cy.url().should('contain', 'products')
        //Verificar se a lista de produtos está visivel
        cy.get('.container .features_items').should('be.visible')
        cy.get('.container .features_items .title').should('have.text', 'All Products')

        // Act
        produto.VisualizarProduto()

        //Assert
        cy.url().should('contain', 'product_details/1')
        // Verify that detail detail is visible: product name, category, price, availability, condition, brand
        cy.get('.product-information h2').should('be.visible').and('have.text', 'Blue Top')

        const expectedTexts = [
            'Category: Women > Tops',
            'Availability: In Stock',
            'Condition: New',
            'Brand: Polo'
        ]

        cy.get('.product-information p').each(($el, index) => {
            cy.wrap($el).should('have.text', expectedTexts[index])
        })
            
        cy.get('.product-information span').eq(1).should('be.visible').and('contain.text', 'Rs. 500')
        
    })

    it('9 - Busca de Produto', () => {
        // Act
        menu.navegarPaginaProduto()
        
        // Assert
        cy.url().should('contain', 'products')
        cy.get('.container .features_items .title').should('have.text', 'All Products')
      
        // Act
        produto.buscarProduto()

        //Assert
        cy.get('.container .features_items .title').should('have.text', 'Searched Products')

        //verificando que o produto buscado está visivel
        cy.get('.productinfo h2').should('have.text', 'Rs. 400')
        cy.get('.productinfo p').should('have.text', 'Men Tshirt')
        cy.get('img[alt="ecommerce website products"]')
            .should('have.attr', 'src')
            .and('include', '/get_product_picture/2')
    })

    it('10 - Validando o Subscription', () => {
        // Arrange
        cy.scrollTo('bottom')
        cy.get('.single-widget h2').should('have.text', 'Subscription')

        // Act
        cy.get('input#susbscribe_email').type('joao@test.com')
        cy.get('#subscribe').click()

        //Assert
        cy.get('#success-subscribe .alert').should('be.visible').and('have.text', 'You have been successfully subscribed!')
        cy.get('#success-subscribe .alert').should('not.be.visible')
    })

    it('15 - Registrar usuário, adicionar produto no carrinho e fazer o checkout do produto', () => {
        // Arrange
        menu.navegarParaLogin()

        // Act 
        // preencher pré formulario
        login.preencherFormularioDePreCadastro() 
        // preencher formulario completo
        cadastro.preencherFormularioDeCadastroCompleto()
  
        // Assert
        cy.url().should('includes', 'account_created')
        cy.contains('b','Account Created!')
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!')

        // Act        
        cadastro.clicarBotaoContinuar()
        produto.adicionarProduto()

        // Assert
        cy.get('.modal-title').should('have.text', 'Added!')
        cy.get('.modal-body .text-center').eq(0).should('have.text', 'Your product has been added to cart.')

       
        // Act
        carrinho.navegarParaCarrinho()

        // Assert
        cy.get('#product-2 .product_image')
          .should('have.attr', 'src')
          .and('include', 'get_product_picture/2')
        cy.get('a[href="/product_details/2"]').should('have.text', 'Men Tshirt')
        cy.get('.cart_price p').should('have.text', 'Rs. 400')
        cy.get('.cart_quantity .disabled').should('have.text', '1')
        cy.get('.cart_total_price').should('have.text', 'Rs. 400')

   
        // Act
        carrinho.clicarCheckout()
        carrinho.digitarDescricao()
        carrinho.realizarPagamento()


        // Assert
        cy.get('body').then(($body) => { 
            const message = $body.find('#success_message .alert-success') 
         if (message.length > 0) { 
            cy.wrap(message).should('have.text', 'Your order has been placed successfully!')
         }
        })
        cy.get('[data-qa="order-placed"]').should('be.visible').should('have.text','Order Placed!')
        cy.contains("p", "Congratulations! Your order has been confirmed!")
    })
})


