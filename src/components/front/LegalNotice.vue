<template>
  <div class="legal-notice">
    <div class="ln-fr" v-if="$i18n.locale === 'fr'">
      <h1>{{ $t('misc.legalNotice') }}</h1>
      <h4>Utilisation des cookies</h4>
      <p>Le site internet utilise en tout et pour tout quatre types de cookies. Je le sais, c'est moi qui les ai créés.</p>
      <h5>Fonctions générales (1 cookie)</h5>
      <p>
        Lorsque vous arrivez sur le site pour la première fois depuis un certain temps, une bannière s'affiche. <br />
        Dans le même temps, le site vérifie si votre navigateur contient son cookie, afin de ne plus vous montrer la bannière à l'avenir. <br />
        Si c'est le cas, le site vous en ajoutera un nouveau, et vous affichera la bannière en même temps.
      </p>
      <h5>Blog (2 cookies)</h5>
      <p>
        Par mesures anti-spam, tout utilisateur laissant un commentaire recevra un cookie d'une durée de vie de 5 minutes. <br />
        Tant que le cookie n'a pas expiré, l'utilisateur ne sera pas en mesure de laisser d'autres commentaires, mais pourra répondre
        à d'autres commentaires. Encore une fois, il sera limité à 5 minutes après avoir répondu à un commentaire pour éviter le flood à cause d'un autre cookie. <br />
        Je reçois un mail pour chaque commentaire / réponse laissée.
      </p>
      <h5>Contact (1 cookie)</h5>
      <p>
        Toujours par mesure anti-spam, l'envoi d'un message dans la partie contact résultera d'un nouveau cookie dans votre navigateur. <br />
        Également d'une durée de cinq minute, il vous empêchera d'envoyer un autre message sous ce délai.
      </p>
    </div>
    <div class="ln-en" v-if="$i18n.locale === 'en'">
      <h1>{{ $t('misc.legalNotice') }}</h1>
      <h4>Cookie usage</h4>
      <p>This websites uses four cookies for the whole website. I know, since I am the one who created them</p>
      <h4>General functions (1 cookie)</h4>
      <p>
        When you come on this website for the first time in a long while, a banner will show up. <br />
        In the mean time, the website will check if you happen its cookie (the banner one), just to make sure it won't
        show you the banner from now on.
        If it can't find the cookie, it will set you a new one and will display the banner to you.
      </p>
      <h4>Blog (2 cookies)</h4>
      <p>
        For (obvious) antispam reasons, every visitor leaving a comment will get a cookie that has a 5mn life span. <br />
        As long as the cookie is alive, the visitor won't be able to leave another comment, but will be able to respond to another comment. <br />
        Once again, he will need to wait 5 minutes to respond to another comment after that (the times are not cumulated). <br />
        I receive a mail for each comment / response.
      </p>
      <h4>Contact (1 cookie)</h4>
      <p>
        Still for obvious antispam reasons, sending a message from the contact form will also give you a cookie that will also
        live for 5 minutes and won't you send me a new message as long as it's alive.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$parent.setTitle(this.$t('misc.legalNotice'))
  }
}
</script>
