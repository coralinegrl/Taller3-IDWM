<template>
    <div>
        <h1>Commits View</h1>
        <ul>
            <li v-for="commit in commits" :key="commit.id">
                <h3>{{ commit.message }}</h3>
                <p>Author: {{ commit.author }}</p>
                <p>Date: {{ commit.date }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            commits: [
                {
                    id: 1,
                    message: "Initial commit",
                    author: "John Doe",
                    date: "2022-01-01",
                },
                {
                    id: 2,
                    message: "Add feature X",
                    author: "Jane Smith",
                    date: "2022-01-02",
                },
                // Add more commits here...
            ],
        };
    },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
