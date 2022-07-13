const express = require('express');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const Ticket = require('../models/Ticket')
const Events = require('../models/Events')
const {google} = require('googleapis');
const qrcode = require('qrcode')
// const QrPrueba = require('../../client/src/assets/QrPrueba.png')
// const transport = require('../transport.json')

async function ticketVoucher (id){
    // const {id} = req.query
    // const {name , username ,email } = req.body
    let url = `http://localhost:3000/tickets/${id}`
    // try {
        let Comprador = await Ticket.findByPk(id,{include:[{ model: User, as: "user" },
        { model: Events, as: "event" },]})

        let QR = await qrcode.toDataURL(url)
        // console.log(QR)
        // console.log(Comprador)
        const contentHtml=`
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
        
        <head>
            <meta charset="UTF-8">
            <meta content="width=device-width, initial-scale=1" name="viewport">
            <meta name="x-apple-disable-message-reformatting">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta content="telephone=no" name="format-detection">
            <title></title>
            <!--[if (mso 16)]>
            <style type="text/css">
            a {text-decoration: none;}
            </style>
            <![endif]-->
            <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
            <!--[if gte mso 9]>
        <xml>
            <o:OfficeDocumentSettings>
            <o:AllowPNG></o:AllowPNG>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
            <!--[if !mso]><!-- -->
            <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i" rel="stylesheet">
            <!--<![endif]-->
        </head>
        
        <body>
            <div class="es-wrapper-color">
                <!--[if gte mso 9]>
                    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                        <v:fill type="tile" color="#EEEEEE"></v:fill>
                    </v:background>
                <![endif]-->
                <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
                    <tbody>
                        <tr>
                            <td class="esd-email-paddings" valign="top">
                                <table cellpadding="0" cellspacing="0" class="es-content esd-header-popover" align="center">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe" esd-custom-block-id="7954" align="center">
                                                <table class="es-content-body" style="background-color: transparent;" width="600" cellspacing="0" cellpadding="0" align="center">
                                                    <tbody>
                                                        <tr>
                                                            <td class="esd-structure es-p15t es-p15b es-p10r es-p10l" align="left">
                                                                <!--[if mso]><table width="580" cellpadding="0" cellspacing="0"><tr><td width="282" valign="top"><![endif]-->
                                                                <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class="esd-container-frame" width="282" align="left">
                                                                                <table width="100%" cellspacing="0" cellpadding="0">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td class="es-infoblock esd-block-text es-m-txt-c" align="left">
                                                                                                <p style="font-family: arial, helvetica\ neue, helvetica, sans-serif;">Put your preheader text here</p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <!--[if mso]></td><td width="20"></td><td width="278" valign="top"><![endif]-->
                                                                <table class="es-right" cellspacing="0" cellpadding="0" align="right">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class="esd-container-frame" width="278" align="left">
                                                                                <table width="100%" cellspacing="0" cellpadding="0">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="right" class="es-infoblock esd-block-text es-m-txt-c">
                                                                                                <p><a href="https://viewstripo.email" class="view" target="_blank" style="font-family: 'arial', 'helvetica neue', 'helvetica', 'sans-serif';">View in browser</a></p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <!--[if mso]></td></tr></table><![endif]-->
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="es-content es-visible-simple-html-only" cellspacing="0" cellpadding="0" align="center">
                                    <tbody>
                                        <tr></tr>
                                        <tr>
                                            <td class="esd-stripe es-stripe-html" esd-custom-block-id="7681" align="center">
                                                <table class="es-header-body" style="background-color: #2d4059;" width="600" cellspacing="0" cellpadding="0" bgcolor="#2D4059" align="center">
                                                    <tbody>
                                                        <tr>
                                                            <td class="esd-structure es-p35t es-p35b es-p35r es-p35l" align="left">
                                                                <!--[if mso]><table width="530" cellpadding="0" cellspacing="0"><tr><td width="340" valign="top"><![endif]-->
                                                                <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class="es-m-p0r es-m-p20b esd-container-frame" width="340" valign="top" align="center">
                                                                                <table width="100%" cellspacing="0" cellpadding="0">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td class="esd-block-text es-m-txt-c h-auto" align="left" valign="middle" height="71">
                                                                                                <h1 style="color: #ffffff; line-height: 100%;">ConcerTeck</h1>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <!--[if mso]></td><td width="20"></td><td width="170" valign="top"><![endif]-->
                                                                <table cellspacing="0" cellpadding="0" align="right">
                                                                    <tbody>
                                                                        <tr class="es-hidden">
                                                                            <td class="es-m-p20b esd-container-frame" esd-custom-block-id="7704" width="170" align="left">
                                                                                <table width="100%" cellspacing="0" cellpadding="0">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank"><img class="adapt-img" src="https://jpjhfi.stripocdn.email/content/guids/fd868d8e-4754-4b0e-9774-e3d4465cb20f/images/logosombra.png" alt style="display: block;" width="170"></a></td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <table cellspacing="0" cellpadding="0" align="right">
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td align="center" class="esd-empty-container" style="display: none;"></td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <!--[if mso]></td></tr></table><![endif]-->
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="es-content es-visible-simple-html-only" cellspacing="0" cellpadding="0" align="center">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe es-stripe-html" align="center">
                                                <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                                    <tbody>
                                                        <tr>
                                                            <td class="esd-structure es-p35r es-p35l" align="left" bgcolor="#EEEEEE" style="background-color: #eeeeee;">
                                                                <table width="100%" cellspacing="0" cellpadding="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class="esd-container-frame" width="530" valign="top" align="center">
                                                                                <table width="100%" cellspacing="0" cellpadding="0">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td class="esd-block-image es-p25t es-p25b es-p35r es-p35l" align="center" style="font-size: 0px;"><a target="_blank" href="https://viewstripo.email/"><img src="https://jpjhfi.stripocdn.email/content/guids/CABINET_f674cb09635fe64c7e06b9d0c8f4ecd5/images/iconoverdedelamarcaverificacinsmbolosealenelcolorejemplodelvectorilustraciaisl.jpg" alt style="display: block;" height="120"></a></td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td class="esd-block-text es-p25b" align="center">
                                                                                                <h2>Gracias Por Tu Compra!</h2>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="es-content es-visible-simple-html-only" cellspacing="0" cellpadding="0" align="center">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe es-stripe-html" align="center">
                                                <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                                    <tbody>
                                                        <tr>
                                                            <td class="esd-structure es-p10t es-p35r es-p35l" align="left" bgcolor="#EEEEEE" style="background-color: #eeeeee;">
                                                                <table width="100%" cellspacing="0" cellpadding="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class="esd-container-frame" width="530" valign="top" align="center">
                                                                                <table style="border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;" width="100%" cellspacing="0" cellpadding="0">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="left" class="esd-block-text">
                                                                                                <p>Querid@ ${Comprador.user.name}. Te agradecemos por tu compra! Queríamos recordarte que recomendamos presentarte unos momentos antes al comienzo del evento.</p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="es-content es-visible-simple-html-only" cellspacing="0" cellpadding="0" align="center">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe es-stripe-html" esd-custom-block-id="7797" align="center">
                                                <table class="es-content-body" style="background-color: #eeeeee;" width="600" cellspacing="0" cellpadding="0" bgcolor="#EEEEEE" align="center">
                                                    <tbody>
                                                        <tr>
                                                            <td class="esd-structure es-p35t es-p40b es-p35r es-p35l" align="left" bgcolor="#EEEEEE" style="background-color: #eeeeee;">
                                                                <table width="100%" cellspacing="0" cellpadding="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class="esd-container-frame" width="530" valign="top" align="center">
                                                                                <table width="100%" cellspacing="0" cellpadding="0">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="left" class="esd-block-text">
                                                                                                <p>Hola ${Comprador.user.username}! A continuación te adjuntamos el Qr con el que podrás ingresar a disfrutar del show!</p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table cellpadding="0" cellspacing="0" class="es-footer esd-footer-popover es-visible-simple-html-only" align="center">
                                    <tbody>
                                        <tr>
                                            <td class="esd-stripe es-stripe-html" esd-custom-block-id="7684" align="center">
                                                <table class="es-footer-body" width="600" cellspacing="0" cellpadding="0" align="center" bgcolor="#FF5722" style="background-color: #ff5722;">
                                                    <tbody>
                                                        <tr>
                                                            <td class="esd-structure es-p40t es-p40b es-p35r es-p35l" align="left">
                                                                <table width="100%" cellspacing="0" cellpadding="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class="esd-container-frame" width="530" valign="top" align="center">
                                                                                <table width="100%" cellspacing="0" cellpadding="0">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank"><img class="adapt-img" src="${QR}" alt style="display: block;" width="270"></a></td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="esd-structure es-p35t es-p40b es-p35r es-p35l" align="left">
                                                                <table width="100%" cellspacing="0" cellpadding="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class="esd-container-frame" width="530" valign="top" align="center">
                                                                                <table width="100%" cellspacing="0" cellpadding="0">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align="left" class="esd-block-text">
                                                                                                <p style="color: #090909;">Para: ${Comprador.user.email}<br>Nombre de usuario: ${Comprador.user.username}</p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </body>
        
        </html>
        `
        const service = "gmail";
        const type = "OAuth2";
        const user = "concerteck@gmail.com"
        const redirect_uri= "https://developers.google.com/oauthplayground";
        const clientId = "421836283137-tak7au16v1h3ap6t7l3lmqnj84te9pd3.apps.googleusercontent.com";
        const clientSecret = "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";
        const refreshToken = "1//04DJZhRTcznVkCgYIARAAGAQSNwF-L9Irm6uZ7R3pEQMFJnbeRJNFR2GkGNklqekUEx-9zAz_AUV-J6zmsDneiIzEs8-i97A3LDg";

    const oAuth2client = new google.auth.OAuth2(clientId,clientSecret,redirect_uri)          
    oAuth2client.setCredentials({refresh_token:refreshToken});


    async function sendmail(){
        try {
            let accessToken = oAuth2client.getAccessToken()
            let transporter =nodemailer.createTransport(
                {
                    service:service,
                    auth:{
                        type:type,
                        user:user,
                        clientId:clientId,
                        clientSecret:clientSecret,
                        refreshToken:refreshToken,
                        accessToken:accessToken},
                })
            let mailOptions ={
                from:"concerteck@gmail.com",
                to:`${Comprador.user.email}`,
                subject:"Compra de entradas Prueba",
                attachDataUrls: true,
                html:contentHtml
            };

            let result = await transporter.sendMail(mailOptions);
            return result
        } catch (error) {
            console.log(error)
        }
    }
    sendmail()
    .then(result => (result))
    .catch(error => console.log({error: error.message}))
}

module.exports={ticketVoucher}
/*
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title></title>
    <!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]-->
    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
    <!--[if gte mso 9]>
<xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
</xml>
<![endif]-->
    <!--[if !mso]><!-- -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i" rel="stylesheet">
    <!--<![endif]-->
</head>

<body>
    <div class="es-wrapper-color">
        <!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#EEEEEE"></v:fill>
			</v:background>
		<![endif]-->
        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
            <tbody>
                <tr>
                    <td class="esd-email-paddings" valign="top">
                        <table cellpadding="0" cellspacing="0" class="es-content esd-header-popover" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" esd-custom-block-id="7954" align="center">
                                        <table class="es-content-body" style="background-color: transparent;" width="600" cellspacing="0" cellpadding="0" align="center">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p15t es-p15b es-p10r es-p10l" align="left">
                                                        <!--[if mso]><table width="580" cellpadding="0" cellspacing="0"><tr><td width="282" valign="top"><![endif]-->
                                                        <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="282" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="es-infoblock esd-block-text es-m-txt-c" align="left">
                                                                                        <p style="font-family: arial, helvetica\ neue, helvetica, sans-serif;">Put your preheader text here</p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td><td width="20"></td><td width="278" valign="top"><![endif]-->
                                                        <table class="es-right" cellspacing="0" cellpadding="0" align="right">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="278" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="right" class="es-infoblock esd-block-text es-m-txt-c">
                                                                                        <p><a href="https://viewstripo.email" class="view" target="_blank" style="font-family: 'arial', 'helvetica neue', 'helvetica', 'sans-serif';">View in browser</a></p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td></tr></table><![endif]-->
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="es-content es-visible-simple-html-only" cellspacing="0" cellpadding="0" align="center">
                            <tbody>
                                <tr></tr>
                                <tr>
                                    <td class="esd-stripe es-stripe-html" esd-custom-block-id="7681" align="center">
                                        <table class="es-header-body" style="background-color: #2d4059;" width="600" cellspacing="0" cellpadding="0" bgcolor="#2D4059" align="center">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p35t es-p35b es-p35r es-p35l" align="left">
                                                        <!--[if mso]><table width="530" cellpadding="0" cellspacing="0"><tr><td width="340" valign="top"><![endif]-->
                                                        <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="es-m-p0r es-m-p20b esd-container-frame" width="340" valign="top" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="esd-block-text es-m-txt-c h-auto" align="left" valign="middle" height="71">
                                                                                        <h1 style="color: #ffffff; line-height: 100%;">ConcerTeck</h1>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td><td width="20"></td><td width="170" valign="top"><![endif]-->
                                                        <table cellspacing="0" cellpadding="0" align="right">
                                                            <tbody>
                                                                <tr class="es-hidden">
                                                                    <td class="es-m-p20b esd-container-frame" esd-custom-block-id="7704" width="170" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank"><img class="adapt-img" src="https://jpjhfi.stripocdn.email/content/guids/fd868d8e-4754-4b0e-9774-e3d4465cb20f/images/logosombra.png" alt style="display: block;" width="170"></a></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        <table cellspacing="0" cellpadding="0" align="right">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="center" class="esd-empty-container" style="display: none;"></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td></tr></table><![endif]-->
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="es-content es-visible-simple-html-only" cellspacing="0" cellpadding="0" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe es-stripe-html" align="center">
                                        <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p35r es-p35l" align="left">
                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="530" valign="top" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="esd-block-image es-p25t es-p25b es-p35r es-p35l" align="center" style="font-size: 0px;"><a target="_blank" href="https://viewstripo.email/"><img src="https://jpjhfi.stripocdn.email/content/guids/CABINET_f674cb09635fe64c7e06b9d0c8f4ecd5/images/iconoverdedelamarcaverificacinsmbolosealenelcolorejemplodelvectorilustraciaisl.jpg" alt style="display: block;" height="120"></a></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="esd-block-text es-p25b" align="center">
                                                                                        <h2>Gracias Por Tu Compra!</h2>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="es-content es-visible-simple-html-only" cellspacing="0" cellpadding="0" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe es-stripe-html" align="center">
                                        <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p10t es-p35r es-p35l" align="left">
                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="530" valign="top" align="center">
                                                                        <table style="border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;" width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="left" class="esd-block-text">
                                                                                        <p>Querid@ ${Comprador.user.name}. Te agradecemos por tu compra! Queríamos recordarte que recomendamos presentarte unos momentos antes al comienzo del evento.</p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="es-content es-visible-simple-html-only" cellspacing="0" cellpadding="0" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe es-stripe-html" esd-custom-block-id="7797" align="center">
                                        <table class="es-content-body" style="background-color: #eeeeee;" width="600" cellspacing="0" cellpadding="0" bgcolor="#EEEEEE" align="center">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p35t es-p35b es-p35r es-p35l" align="left" bgcolor="#ffffff" style="background-color: #ffffff;">
                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="530" valign="top" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="left" class="esd-block-text">
                                                                                        <p>A continuación te adjuntamos el Link con el que podras ingresar a disfrutar del show!</p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table cellpadding="0" cellspacing="0" class="es-footer esd-footer-popover es-visible-simple-html-only" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe es-stripe-html" esd-custom-block-id="7684" align="center">
                                        <table class="es-footer-body" width="600" cellspacing="0" cellpadding="0" align="center" bgcolor="#FF5722" style="background-color: #ff5722;">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p35t es-p40b es-p35r es-p35l" align="left">
                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="530" valign="top" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="left" class="esd-block-text">
                                                                                        <p style="color: #000000;">Ticket link: " ${url}"</p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="esd-structure es-p35t es-p40b es-p35r es-p35l" align="left">
                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="530" valign="top" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="left" class="esd-block-text">
                                                                                        <p style="color: #090909;">Para: ${Comprador.user.email}<br>Nombre de usuario: ${Comprador.user.username}</p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>

</html>
console.log()

         
*/

// ticket {
//     dataValues: {
//       id: '62c86df9-c620-47ab-9808-9083f2de45aa',
//       name: 'palco',
//       price: 2500,
//       eventId: '697c2c5a-83e0-4558-8d31-f08f9b65762e',
//       userId: '8a6968fb-e7b1-4e2c-81ca-98eae69d065c',
//       user: user {
//         dataValues: [Object],
//         _previousDataValues: [Object],
//         uniqno: 1,
//         _changed: Set(0) {},
//         _options: [Object],
//         isNewRecord: false
//       },
//       event: events {
//         dataValues: [Object],
//         _previousDataValues: [Object],
//         uniqno: 1,
//         _changed: Set(0) {},
//         _options: [Object],
//         isNewRecord: false
//       }
//     },
//     _previousDataValues: {
//       id: '62c86df9-c620-47ab-9808-9083f2de45aa',
//       name: 'palco',
//       price: 2500,
//       eventId: '697c2c5a-83e0-4558-8d31-f08f9b65762e',
//       userId: '8a6968fb-e7b1-4e2c-81ca-98eae69d065c',
//       user: user {
//         dataValues: [Object],
//         _previousDataValues: [Object],
//         uniqno: 1,
//         _changed: Set(0) {},
//         _options: [Object],
//         isNewRecord: false
//       },
//       event: events {
//         dataValues: [Object],
//         _previousDataValues: [Object],
//         uniqno: 1,
//         _changed: Set(0) {},
//         _options: [Object],
//         isNewRecord: false
//       }
//     isNewRecord: false,
//     user: user {
//       dataValues: {
//         id: '8a6968fb-e7b1-4e2c-81ca-98eae69d065c',
//         username: 'troseneitor',
//         name: 'Agustin Trossero',
//         isAdmin: false,
//         email: 'troseneitor@gmail.com'
//       },
//       _previousDataValues: {
//         id: '8a6968fb-e7b1-4e2c-81ca-98eae69d065c',
//         username: 'troseneitor',
//         name: 'Agustin Trossero',
//         isAdmin: false,
//         email: 'troseneitor@gmail.com'
//       },
//       uniqno: 1,
//       _changed: Set(0) {},
//       _options: {
//         isNewRecord: false,
//         _schema: null,
//         _schemaDelimiter: '',
//         include: undefined,
//         includeNames: undefined,
//         includeMap: undefined,
//         includeValidated: true,
//         raw: true,
//         attributes: undefined
//       },
//       isNewRecord: false
//     },
//     event: events {
//       dataValues: {
//         id: '697c2c5a-83e0-4558-8d31-f08f9b65762e',
//         name: 'Divididos en vivo',
//         artist: 'Divididos',
//         schedule: 2022-08-17T21:00:00.000Z,
//         performerImage: 'https://lastfm.freetls.fastly.net/i/u/770x0/c680cb0c72de80e17656d75121b6155d.jpg',
//         placeImage: 'https://billboard.com.ar/wp-content/uploads/2018/06/69111417b33d14147714a0e09de29e71.jpg',
//         description: 'La aplanadora del Rock vuelve al Luna Park para hacer delirar a todo los presentes con sus mejores temas, festejando sus 30 años de carrera.',
//         isAprobe: false,
//         genreId: 2,
//         venueId: 'lunapark',
//         stockId: 'Divididoslunapark2022-08-17T21:00:00.000Z'
//       },
//       _previousDataValues: {
//         id: '697c2c5a-83e0-4558-8d31-f08f9b65762e',
//         name: 'Divididos en vivo',
//         artist: 'Divididos',
//         schedule: 2022-08-17T21:00:00.000Z,
//         performerImage: 'https://lastfm.freetls.fastly.net/i/u/770x0/c680cb0c72de80e17656d75121b6155d.jpg',
//         placeImage: 'https://billboard.com.ar/wp-content/uploads/2018/06/69111417b33d14147714a0e09de29e71.jpg',
//         description: 'La aplanadora del Rock vuelve al Luna Park para hacer delirar a todo los presentes con sus mejores temas, festejando sus 30 años de carrera.',
//         isAprobe: false,
//         genreId: 2,
//         venueId: 'lunapark',
//         stockId: 'Divididoslunapark2022-08-17T21:00:00.000Z'
//       }
//     }
//   }