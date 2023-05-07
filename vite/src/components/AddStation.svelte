<script lang="ts">

import axios from 'axios';

let name: HTMLInputElement;

let url: HTMLInputElement;

let favorite = false;

export let baseUrl: string;

const handleSubmit = async (event: any) => {

    event.preventDefault();

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

<form class="flex flex-column" on:submit={handleSubmit}>

    <label class="flex flex-column" for="name">
        Name
        <input type="text" id="name" name="name" placeholder="Name" bind:value={name} />
    </label>

    <label class="flex flex-column" for="url">
        Url
        <input type="text" id="url" name="url" placeholder="URL" bind:value={url} />
    </label>

    <label class="flex flex-row" for="favorite">
        <input type="checkbox" id="favorite" name="favorite" bind:checked={favorite} />
        Favorite
    </label>

    <button type="submit">Add Station</button>

</form>