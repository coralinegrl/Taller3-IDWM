<template>
    <ion-page>
      <ion-header>
        <ion-toolbar class="custom-toolbar">
          <ion-title class="white-title">Commits</ion-title>
          <ion-buttons slot="end">
            <ion-button class="white-button" @click="goToRepositories">
              ATRÁS
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <ion-list>
          <ion-item v-for="commit in commits" :key="commit.sha" class="commit-item">
            <ion-label>
              <h2>{{ commit.commit.message }}</h2>
              <p>{{ commit.author.login }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-page>
</template>
  
<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonList, IonItem, IonLabel } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Octokit } from '@octokit/rest';
import { watch } from 'vue';



/**
 * Componente Vue para visualizar los commits de un repositorio específico en GitHub.
 * Utiliza la API de GitHub para recuperar la información de los commits.
 *
 * @component
 */  
export default defineComponent({
    name: 'CommitsView',
    /**
     * Registra los componentes Ionic utilizados.
     */
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        IonButton,
        IonButtons,
        IonList,
        IonItem,
        IonLabel,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      // Obtiene el token de GitHub desde las variables de entorno.
      const tokenGithub =  process.env.VUE_APP_GITHUB_ACCESS_TOKEN
      console.log(tokenGithub)
      // Instancia de Octokit para las operaciones de la API de GitHub.
      const octokit = new Octokit({ auth: tokenGithub });
      // Ref para almacenar los commits del repositorio seleccionado.
      const commits = ref([]);
      
      /**
         * Obtiene los commits de un repositorio específico.
         * Ordena los commits por fecha en orden descendente.
         *
         * @param {string} repoName - El nombre del repositorio para el cual obtener los commits.
      */
      const getCommits = async (repoName) => {
        try {
          const response = await octokit.rest.repos.listCommits({
            owner: 'Dizkm8',
            repo: repoName,
          });
          commits.value = response.data.sort((a, b) => new Date(b.commit.author.date) - new Date(a.commit.author.date));
        } catch (error) {
          console.error('Error al obtener los commits:', error);
        }
      };
  
      // Observa cambios en el parámetro de ruta 'repoName' y llama a getCommits si cambia.
      watch(() => route.params.repoName, (newRepoName, oldRepoName) => {
        if (newRepoName !== oldRepoName) {
          getCommits(newRepoName);
        }
      }, { immediate: true });
      
      
      return {
        commits,
        getCommits,
        goToRepositories() {
          router.push('/repositories');
        },
      };
    },
    methods: {
      
    },
});
</script>
  
<style scoped>
.commit-item {
    margin: 0.5em;
    border-radius: 15px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    background: #ffffff;
    transition: transform 0.1s ease;
}

.commit-item:hover {
    transform: translateY(-2px);
}

ion-toolbar {
    --background: #ff7675;
}

.white-title {
  color: white;
}

.white-button {
  --color: white;
}

.custom-toolbar {
  --background: #ff7675;
}
</style>
