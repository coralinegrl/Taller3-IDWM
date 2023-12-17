<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary" class="ion-toolbar">
        <ion-title>Repositories </ion-title>
        
        <!-- Agrega el botón en la parte superior derecha -->
        <ion-buttons slot="end">
          <ion-button @click="goToProfile" class="profile-button">
            <img src="../assets/perfil.png" alt="Perfil" />
          </ion-button>


        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    

    <ion-content class="ion-padding">
      
      <ion-spinner v-show="isLoading" name="crescent" />
      
      <ion-list v-if="!isLoading">
        <ion-item v-for="repo in repositories" :key="repo.id" @click="goToCommits(repo.name)" class="repository-item">
          <ion-label>
            <h2>{{ repo.name }}</h2>
            <p>Creado: {{ new Date(repo.created_at).toLocaleDateString() }}</p>
            <p>Commits: {{ repo.commitsCount }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
      
    </ion-content>
  </ion-page>
</template>
  
<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonSpinner } from '@ionic/vue';
import { defineComponent } from 'vue';
import router from '../router'; // Importa el enrutador de Vue Router
import { UserStore } from '@/stores/user_state'; // Importa el almacenamiento local de usuario
import { Octokit } from '@octokit/rest';
import { ref } from 'vue';





export default defineComponent({
  name: 'RepositoriesView',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonButtons,
    IonSpinner,
  },
  setup() {
    const mainStore = UserStore();
    const user = mainStore.user;
    const tokenGithub =  process.env.VUE_APP_GITHUB_ACCESS_TOKEN
    const isLoading = ref(false); // Indica si se está cargando la información
    console.log(tokenGithub)
    const octokit = new Octokit({ auth: tokenGithub });
    console.log(octokit)
    const repositories = ref([]);
    return {
      user,
      mainStore,
      octokit,
      repositories,
      tokenGithub,
      isLoading,
    };
  },
  methods: {

    async getRepositories() {
      try {
        this.isLoading = true;
        const response = await this.octokit.rest.repos.listForUser({
          username: 'Dizkm8',
          sort: 'updated',
        });
        console.log(response.data);
        for await (const repo of response.data) {
          // Obtener la cantidad de commits para cada repositorio
          const commitsResponse = await this.octokit.rest.repos.listCommits({
            owner: repo.owner.login,
            repo: repo.name,
          });
          repo.commitsCount = commitsResponse.data.length;
        }
        // Ordenar por fecha de creación
        this.repositories = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        this.isLoading = false;
      } catch (error) {
        console.error('Error al obtener los repositorios:', error);
      }
    },

    goToCommits(repoName) {
      // Navega al componente CommitsView pasando el nombre del repositorio como parámetro
      router.push({ name: 'CommitsView', params: { repoName: repoName } });
    },
    // Función para redirigir al perfil (ProfileView.vue)

    goToProfile() {
      router.push('/profile');
    },

  },

  async mounted() {
    await this.getRepositories();

  },
});
</script>
  
<style scoped>
 ion-toolbar {
    --background: #ff7675;
  }

ion-content {
  --background: #f5f5f5;
  /* Fondo claro para el contenido, si así lo deseas */
}

.repository-item {
  margin: 0.5em;
  border-radius: 15px;
  /* Bordes redondeados */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  /* Sombra suave para el relieve */
  background: #ffffff;
  /* Fondo blanco para cada recuadro */
  transition: transform 0.1s ease;
  /* Animación para el clic */
}

.repository-item:hover {
  transform: translateY(-2px);
  /* Efecto al pasar el mouse */
}

.profile-button {
  --background: transparent; /* Hace el fondo del botón transparente */
  --padding: 0; /* Elimina el padding del botón para que la imagen llene el botón */
  --border: none; /* Elimina el borde del botón */
}

.profile-button img {
  height: 30px; /* o el tamaño que desees */
  width: auto; /* mantiene la relación de aspecto de la imagen */
}

</style>