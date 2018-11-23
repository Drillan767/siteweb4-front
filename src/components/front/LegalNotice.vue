<template>
  <div class="legal-notice">
    <div class="ln-fr">
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
        Tant que le cookie n'a pas expiré, l'utilisateur ne sera pas en mesure de laisser d'autres commentaires, mais pourra répondre <br />
        à d'autres commentaires. Encore une fois, il sera limité à 5 minutes après avoir répondu à un commentaire pour éviter le flood à cause d'un autre cookie. <br />
        Je reçois un mail pour chaque commentaire / réponse laissée.
      </p>
      <h5>Contact (1 cookie)</h5>
      <p>
        Toujours par mesure anti-spam, l'envoi d'un message dans la partie contact résultera d'un nouveau cookie dans votre navigateur. <br />
        Également d'une durée de cinq minute, il vous empêchera d'envoyer un autre message sous ce délai.
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
