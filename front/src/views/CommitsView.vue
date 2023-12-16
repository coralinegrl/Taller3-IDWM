<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Commits</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="goToRepositories">
              Volver
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <ion-list>
          <ion-item v-for="commit in commits" :key="commit.sha" class="commit-item">
            <ion-label>
              <h2>{{ commit.commit.message }}</h2>
              <p>{{ commit.author.login }} - {{ commit.message | formatDate }}</p>
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



  
  export default defineComponent({
    name: 'CommitsView',
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
        
      // ... tus otros componentes importados ...
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });
      const commits = ref([]);
  
      const getCommits = async (repoName) => {
        try {
          const response = await octokit.rest.repos.listCommits({
            owner: 'Dizkm8', // Este debería ser el propietario del repositorio
            repo: repoName,
          });
          commits.value = response.data.sort((a, b) => new Date(b.commit.author.date) - new Date(a.commit.author.date));
        } catch (error) {
          console.error('Error al obtener los commits:', error);
        }
      };
  
      // Llamar a getCommits cuando el componente se monta y cuando el parámetro de ruta cambia
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
      // ... si tienes métodos adicionales ...
    },
  });
  </script>
  
  <style scoped>
  /* Reutiliza los estilos de RepositoriesView.vue aquí */
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
  </style>
  