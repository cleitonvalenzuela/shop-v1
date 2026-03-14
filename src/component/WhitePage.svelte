<script>
    import { PUBLIC_UPLOAD_BASE } from "$env/static/public";
    import { formatPrice } from "$lib/formating";

    let { product } = $props();

    const image = $derived(product?.images?.find(item => item.index == 0));
    const price = $derived(product?.prices?.reduce((a, b) => a.promotional < b.promotional ? a : b));
</script>

<link rel="stylesheet" href="/pages/inline_styles.css">
<link rel="stylesheet" href="/pages/style_block_1_4df87e4cd0.css">
<link rel="stylesheet" href="/pages/style_block_2_b3d868fbb0.css">
<link rel="stylesheet" href="/pages/style_block_3_ae91b6c446.css">
<link rel="stylesheet" href="/pages/style_block_4_a1747e8756.css">
<link rel="stylesheet" href="/pages/style_block_5_997a8511d6.css">
<div class="apresentacao-preco" opcao="parcsemjuros"></div>
<div class="modal-theme modal-terms">
    <div class="modal-shadow"></div>
    <div class="modal-wrapper">
        <div class="modal-info">
            <div class="close-icon"><i class="icon icon-times"></i></div>
        </div>
    </div>
</div>
<div class="modal-calculadora extracted-inline-style-1"></div>
<div class="overlay-shadow"></div>
<div class="application">
    <div id="menu-mobile" class="menu-mobile">
        <div class="close-box close-overlay"><i class="icon icon-times"></i></div>
        <div class="block-title flex align-center">
            <div class="header-menu">
                <div></div>
                <div></div>
                <div></div>
            </div>
            Menu
        </div>
        <div class="nav-mobile-wrapper">
            <nav class="nav-mobile">
                <ul class="list first-level">
                    <li class="sub">
                        <a class="title-sub">
                            Contato 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"></path>
                            </svg>
                        </a>
                        <ul class="second-level extracted-inline-style-2"></ul>
                    </li>
                    <li class="extracted-inline-style-3">
                        <hr>
                    </li>
                </ul>
                <ul class="list first-level">
                    <li><a href="#">Promoções</a></li>
                    <li><a href="#">Páscoa</a></li>
                    <li><a href="#">Eletroportáteis</a></li>
                    <li class="sub">
                        <a href="#">
                            Embalagens 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"></path>
                            </svg>
                        </a>
                        <ul class="second-level extracted-inline-style-4"></ul>
                    </li>
                    <li class="sub">
                        <a href="#">
                            Descartáveis 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"></path>
                            </svg>
                        </a>
                        <ul class="second-level extracted-inline-style-5"></ul>
                    </li>
                    <li class="sub">
                        <a href="#">
                            Utilidades 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"></path>
                            </svg>
                        </a>
                        <ul class="second-level extracted-inline-style-6"></ul>
                    </li>
                    <li class="sub">
                        <a href="#">
                            Cama, Mesa e Banho 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"></path>
                            </svg>
                        </a>
                        <ul class="second-level extracted-inline-style-7"></ul>
                    </li>
                    <li><a href="#">Dia das Mulheres</a></li>
                    <li><a href="#">Papelaria</a></li>
                    <li><a href="#">Perfumaria e Cosméticos</a></li>
                    <li><a href="#">Organizadores</a></li>
                    <li><a href="#">Brinquedos e Kids</a></li>
                    <li><a href="#">Lazer</a></li>
                    <li><a href="#">Higiene Pessoal</a></li>
                    <li><a href="#">Linha Pet</a></li>
                    <li><a href="#">Mesa Posta</a></li>
                    <li><a href="#">Decoração</a></li>
                    <li><a href="#">Confeitaria</a></li>
                    <li><a href="#">Jardinagem</a></li>
                    <li><a href="#">Limpeza</a></li>
                    <li><a href="#">Tratamento de piscinas</a></li>
                    <li><a href="#">Ferramentas</a></li>
                    <li class="sub">
                        <a href="#">
                            Festas 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"></path>
                            </svg>
                        </a>
                        <ul class="second-level extracted-inline-style-8"></ul>
                    </li>
                    <li><a href="#">Novidades</a></li>
                    <li><a href="#">Para o seu negócio</a></li>
                    <li><a href="#">Lavanderia</a></li>
                    <li><a href="#">Alimentos</a></li>
                    <li><a href="#">OUTLET</a></li>
                    <li><a href="#">Carnaval</a></li>
                </ul>
            </nav>
        </div>
        <div class="account flex align-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="extracted-inline-style-9 bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"></path>
            </svg>
            <div>
                <span>Minha Conta</span> 
                <div class="login-links"><a href="#" title="Entrar">Entrar</a> <span>/</span> <a href="#" title="Cadastrar">Cadastrar</a></div>
            </div>
            <div class="tray-hide sf-hidden"></div>
        </div>
    </div>
    <header class="header not-visible">
        <span class="quant-cart extracted-inline-style-10">0</span> 
        <div class="barra-oferta barra-oferta-cabecalho">
            <div class="container center marquee">Ganhe 10% off com o cupom PRIMEIROPEDIDO</div>
        </div>
        <div class="bg">
            <div class="line flex align-center justify-between container">
                <div class="header-menu">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div class="header-search-wrapper">
                    <div class="box-paginas-extras-cabecalho sf-hidden"></div>
                    <form action="#">
                        <input class="input-search" placeholder=" Pesquise o produto desejado... " spellcheck="false" autocomplete="off" type="text" name="palavra_busca" value=""> <button class="button-search" aria-label="Buscar"><i class="icon icon-search"></i></button> 
                        <div class="suggestion is-hidden sf-hidden"></div>
                    </form>
                </div>
                <div class="menu-mobile-itens">
                    <div class="item-menu">
                        <div class="carrinho-lateral-on">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-bag-check" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"></path>
                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"></path>
                            </svg>
                            <div class="cart-quantity">0</div>
                        </div>
                    </div>
                </div>
                <div class="logo-menu-mobile"><a class="logo" href="#" title="Casadora"><img src="/pages/asset_8_c101928c89.webp" alt="Casadora" width="222" height="36"></a></div>
            </div>
        </div>
        <nav class="nav nav-padrao one-column sf-hidden"></nav>
    </header>
    <main class="site-main">
        <div class="page-content">
            <div class="container">
                <div class="catalogo-container">
                    <link rel="stylesheet" href="/pages/style_block_6_25a194d5e8.css">
                    <div class="cupom-especial mt-2"></div>
                </div>
                <div id="product-wrapper" class="product-wrapper">
                    <div class="product-box">
                        <div class="product-gallery">
                            <div class="product-images swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-android">
                                <div class="tag-discount"><span>27% OFF</span></div>
                                <div class="swiper-wrapper" id="swiper-wrapper-2cfd2493585baa07" aria-live="polite">
                                    <div class="image swiper-slide active swiper-slide-active extracted-inline-style-12" role="group" aria-label="1 / 7">
                                        <div class="zoom"><img class="swiper-lazy swiper-lazy-loaded" alt={product?.title} src={`${PUBLIC_UPLOAD_BASE}/${image?.source}`}></div>
                                    </div>
                                </div>
                                <span class="swiper-notification sf-hidden" aria-live="assertive" aria-atomic="true"></span>
                            </div>
                        </div>
                        <div class="product-left product-form">
                            <div class="product-loader loader">
                                <div class="spinner">
                                    <div class="double-bounce-one"></div>
                                    <div class="double-bounce-two"></div>
                                </div>
                                <div class="message">Atualizando informações ...</div>
                            </div>
                            <div class="product-tags"></div>
                            <h1 class="product-name">{product.title}</h1>
                            <div class="product-main-info adicionar-favoritos"><a href="#">Adicionar aos Favoritos</a></div>
                            <div class="product-main-info">
                                <div class="product-sku">Ref: <span class="product-sku ref" id="product-reference">76504</span></div>
                                <div class="wishlist" title="Adicionar aos favoritos">
                                    <div id="container-add-lista">
                                        <div id="bloco-add-lista"><a class="color" href="#">Adicionar à Lista</a></div>
                                    </div>
                                </div>
                            </div>
                            <div class="product-rating-catalog">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="extracted-inline-style-28 bi bi-star" viewBox="0 0 16 16">
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="extracted-inline-style-29 bi bi-star" viewBox="0 0 16 16">
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="extracted-inline-style-30 bi bi-star" viewBox="0 0 16 16">
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="extracted-inline-style-31 bi bi-star" viewBox="0 0 16 16">
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="extracted-inline-style-32 bi bi-star" viewBox="0 0 16 16">
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                                </svg>
                                <a id="ancho-comments" href="#comentarios" class="total">Opine</a>
                            </div>
                            <form id="form_comprar">
                                <div class="product-info product-availability"><span class="bold">Disponibilidade:</span> Imediata</div>
                                <div class="product-gifts"></div>
                                <div class="product-price product-price-tray">
                                    <div id="product-priceBox">
                                        <div class="produto-preco bg-tone-5 border-tone-5">
                                            <div id="coupon-badge"></div>
                                            <div id="preco" align="left">
                                                <div id="produto_preco">
                                                    <div class="precode" id="precoDe">De <abbr class="currency" title="BRL">R$</abbr> {formatPrice(price?.regular)}</div>
                                                    <span class="PrecoPrincipal color-tone-2"><span class="current-price-second">R$ {formatPrice(price?.promotional)} à vista</span></span>    
                                                    <div id="detalhes_formas"></div>
                                                </div>
                                                <div id="produto_nao_disp"></div>
                                            </div>
                                            <div id="info" class="produto-formas-pagamento sf-hidden" align="left"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="calculadora-area extracted-inline-style-32"></div>
                                <div class="actions">
                                    <div class="tray-buy-button">
                                        <span id="span_erro_carrinho" class="blocoAlerta extracted-inline-style-33">Selecione uma opção para variação do produto</span> 
                                        <span id="product-form-box" class="passo1">
                                            <div class="quantidade-box">
                                                <div class="quantidade-box-input"><input id="quantidade" name="quant" class="text numeric" value="1" maxlength="4" title="Campo Quantidade"></div>
                                                <div class="quantidade-box-controles">
                                                    <div class="quantidade-box-controles-itens">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="extracted-inline-style-34 bi bi-plus" viewBox="0 0 16 16">
                                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                                                        </svg>
                                                    </div>
                                                    <div class="quantidade-box-controles-itens">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="extracted-inline-style-35 bi bi-dash" viewBox="0 0 16 16">
                                                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="bt_comprar" class="remove-bg" align="left">
                                                <button class="botao-commerce botao-comprar" id="button-buy" type="button"><span class="botao-commerce-img">Comprar</span></button> 
                                                <div id="loading_btn" align="left" class="extracted-inline-style-37">Calculando ...</div>
                                            </div>
                                        </span>
                                    </div>
                                    <span class="message">* Aqui sua compra é 100% segura, compre com tranquilidade.</span>
                                </div>
                            </form>
                            <div class="produto-whatspp"><a href="#" rel="noreferrer" target="_blank">Dúvidas?</a></div>
                        </div>
                    </div>
                </div>
                <div id="product-ajax" class="extracted-inline-style-39"></div>
                <div id="product-menu-ajax" class="extracted-inline-style-40"></div>
            </div>
        </div>
    </main>
    <footer class="footer with-border">
        <div class="footer-formas-pagamento">
            <div class="container text-center pt-2 pb-2">
                <div class="title">Formas de pagamento</div>
                <div class="flex justify-center">
                    <ul class="payment-list flex f-wrap">
                        <li class="payment-form"><img class="lazyload loaded" alt="Cartão Visa - Vindi" src="/pages/asset_24_da6c52238e.webp"></li>
                        <li class="payment-form"><img class="lazyload loaded" alt="Cartão MasterCard - Vindi" src="/pages/asset_25_9ce230d6c1.webp"></li>
                        <li class="payment-form"><img class="lazyload loaded" alt="Cartão Amex - Vindi" src="/pages/asset_26_67822dc7d7.webp"></li>
                        <li class="payment-form"><img class="lazyload loaded" alt="Cartão Elo - Vindi" src="/pages/asset_27_a8ebf6114e.webp"></li>
                        <li class="payment-form"><img class="lazyload loaded" alt="Transf. Itau" src="/pages/asset_28_a6039e94e2.webp"></li>
                        <li class="payment-form"><img class="lazyload loaded" alt="Boleto - Vindi" src="/pages/asset_29_7e04ff86de.webp"></li>
                        <li class="payment-form"><img class="lazyload loaded" alt="Pix - Vindi" src="/pages/asset_30_ae78a2aa43.webp"></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="cols">
            <div class="container flex justify-between f-wrap footer-content">
                <div class="box">
                    <div class="title">Institucional</div>
                    <div class="overflow">
                        <ul class="list">
                            <li><a href="#" title="Quem Somos">Quem Somos</a></li>
                            <li><a href="#" title="Políticas de Entrega">Políticas de Entrega</a></li>
                            <li><a href="#" title="Trocas e Devoluções">Trocas e Devoluções</a></li>
                            <li><a href="#" title="Políticas de Privacidade">Políticas de Privacidade</a></li>
                            <li><a href="#" title="Termos de Uso">Termos de Uso</a></li>
                            <li><a href="#" title="Listas">Listas</a></li>
                            <li><a href="#" title="Informações sobre o Frete">Informações sobre o Frete</a></li>
                            <li><a href="#" title="Fale Conosco">Fale Conosco</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <div class="box-opcoes-flutuantes extracted-inline-style-45"></div>
    <div class="box-lgpd extracted-inline-style-46"></div>
    <div class="carrinho-lateral">
        <div class="carrinho-lateral-cabecalho">
            <div class="carrinho-lateral-cabecalho-item">
                <h3>Meu Carrinho</h3>
            </div>
            <div class="carrinho-lateral-cabecalho-item carrinho-lateral-fechar">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"></path>
                </svg>
            </div>
        </div>
        <div class="carrinho-lateral-corpo">
            <p>Carrinho Vazio</p>
        </div>
        <div class="carrinho-lateral-rodape">
            <div class="carrinho-lateral-rodape-item carrinho-lateral-subtotal">
                <div class="carrinho-lateral-total-produtos">Sem itens</div>
                <div class="carrinho-lateral-total-valor">Subtotal: <strong>R$ 0,00</strong></div>
            </div>
            <div class="carrinho-lateral-rodape-item carrinho-lateral-finalizar-compra"><a href="#">Finalizar Compra</a></div>
            <div class="carrinho-lateral-rodape-item carrinho-lateral-continuar-comprando">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="extracted-inline-style-47 bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"></path>
                </svg>
                Continuar Comprando
            </div>
        </div>
    </div>
    <div class="carrinho-fundo-sombra carrinho-lateral-fechar menu-lateral-fechar"></div>
</div>
<link rel="stylesheet" href="/pages/style_block_7_e1888b4958.css">