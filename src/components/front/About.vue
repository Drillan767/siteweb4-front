<template>
  <div class="about">
    <div class="header">
      <h1>{{ $t('navbar.about') }}</h1>
    </div>
    <div class="content row">
      <div class="col-md-4 picture">
        <img :src="$parent.user.profile_pic" alt="">
      </div>
      <div class="col-md-8 text">
        <p>
          Lorem markdownum postquam. At vanum vocando; sunt Nec Turnusque raris concitus sortes sorores relinquunt luxuriare.
          Furori foret non alias modo meliora caede coloni patiere pectora; duros ait posita filia?
        </p>
        <ol>
          <li>Ulterius vinclo</li>
          <li>Fera solutum moram unum</li>
          <li>Aequor flumina tamen</li>
          <li>Pervenit et si stabat tellus</li>
          <li>Agros contingent ut his iacentes clauserat credere</li>
        </ol>
        <p>
          Super oculos perterritus moenibus namque est summaque visceraque concubitus terram gravem sidera, sidereos
          cuique Acmon illa, demptos. Placido ego pleno quo: exit ait! Nobis nox vidit vale Alcides, se satis.
        </p>
        <p>
          Ad subigebat, ad Romanique posti minoribus iungit nisi corpore naturae est. Motu tractare satis onerosior duraque,
          procorum!
        </p>
        <blockquote>
          <p>Lenta quantum se fecundus, quod, pectine erit mollit retia ter: sed. Lentae frugum, robora, at vastator, convivia.
            His tamen occidit Ionium dolore, mare totiens patriosque Io utile, sibi ego lumina amorem. Senectus campis,
            summoque, tarda modo certare, carpserat rudis rettulit: fere est; enixa illa metiris? Causa cuius, acta, Arethusa
            et ferox nec mihi parentem venientique ut rigidum forsitan, Iasonis.
          </p>
        </blockquote>
        <p>Cum tamen Euandri sanguis coloque; soleant aequore ratis tura. Hastam fistula, malus atque veniebat plura, saltus.
          Saxeus nitidaque deducit; crudelis aquas herba per terra quibus, ilicet tota; verba imis nova? Fuit Olenios sanguine domum unum nullo onerosior argentea.</p>
        <p>Cetera concursibus iungere supplentur fugit suoque maledicere erant, qui et saltus, liquefaciunt trahit concutiensque vere: Argolicae. Animas negat et mutua prisci Maeoniaeque quid hic sorores monte saevit nymphaeque cupidine levis, securi?</p>
      </div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
export default {

  mounted () {
    this.$parent.setTitle(this.$t('navbar.about'))
  },

  computed: {
    translate () {
      if (this.$i18n.locale === 'fr') {
        return marked(this.$parent.user.about)
      }
    }
  }
}
</script>
