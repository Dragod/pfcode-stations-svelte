
<script lang="ts">

import axios from 'axios';

let stationName: string;
export let baseUrl: string;


async function deleteStation() {

    try {

        const { data } = await axios.delete(`${baseUrl}/stations/${stationName}`);

        console.log(data);

    } catch (error) {

        console.error(error);

        error = error;

    }

}

function handleSubmit() {

    deleteStation();

}

</script>

<h2 class="ma-t-1">Delete Station</h2>

<form class="flex flex-column ma-t-1" on:submit={handleSubmit}>

    <label class="flex flex-column" for="name">

        <div class="flex flex-row">
            <span class="flex flex-1">Name</span>
            <small class="self-center">Required</small>
        </div>

        <input type="text" id="name" name="name" placeholder="Delete station by name" bind:value={stationName} required />

    </label>

    <button class="ma-t-1" type="submit">Delete</button>

</form>

<style lang="scss">
    .ma-t-1 {
        margin-top: 1rem;
    }
</style>