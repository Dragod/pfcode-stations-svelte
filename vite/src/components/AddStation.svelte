<script lang="ts">

import axios from 'axios';

let name: HTMLInputElement;

let url: HTMLInputElement;

let favorite = false;

export let baseUrl: string;

const handleSubmit = async (event: any) => {

    //event.preventDefault();

    try {

        const { data: insertedStationData } = await axios.post(
            `${baseUrl}/stations`,
            { name, url, favorite },
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );

        console.log(insertedStationData);

    }
    catch (error) {

        console.error(error);

    }

};

</script>

<h2>Add Station</h2>

<form class="flex flex-column ma-t-1" on:submit={handleSubmit}>

    <label class="flex flex-column" for="name">
        <div class="flex flex-row">
            <span class="flex flex-1">Name</span>
            <small class="self-center">Required</small>
        </div>
        <input type="text" id="name" name="name" placeholder="Station name" bind:value={name} required />
    </label>

    <label class="flex flex-column" for="url">
        <div class="flex flex-row">
            <span class="flex flex-1">Url</span>
            <small class="self-center">Required</small>
        </div>
        <input type="text" id="url" name="url" placeholder="Url: https://..." bind:value={url} required />
    </label>

    <label class="flex flex-row not-selectable pointer ma-t-1" for="favorite">
        <input type="checkbox" id="favorite" class="pointer" name="favorite" placeholder="Favorite" bind:checked={favorite} />
        Favorite
    </label>

    <button class="ma-t-1" type="submit">Add Station</button>

</form>

<style lang="scss">
.pointer { cursor: pointer;}
.ma-t-1 { margin-top: 1rem; }
.not-selectable { user-select: none; }
</style>