<script lang="ts">

  import axios from "axios"

  export let baseUrl: string

  let stations: Array<any> = []

  let getStations = async () => {

    try {

      const response = await axios.get(`${baseUrl}/stations`)

      stations = response.data

      stations.sort((a, b) => {

        if (a.name < b.name) return -1

        if (a.name > b.name) return 1

        return 0

      })

      return stations

    } catch (error) {

      console.log(error)

    }

  }

  getStations()

  let searchTerm: string = ''

  $: filteredStations = stations.filter(station =>

    station.name.toLowerCase().includes(searchTerm.toLowerCase())

  )

  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  function onClickStation(station: any) {

    dispatch('click', { station })

  }

</script>

<div class="stations-list flex flex-2 flex-column">

  <h2>Stations</h2>

  <input
    type="text"
    placeholder="Filter station by name"
    bind:value={searchTerm}
    class="filter-input"
  />

  <div class="flex flex-row justify-between station-header">
    <div class="flex flex-1">Name</div>
    <div class="flex flex-3">URL</div>
    <div class="flex flex-1 justify-end">Favorite</div>
  </div>

  {#if filteredStations.length > 0}

  <div class="flex flex-1  flex-column overflow-auto">

    {#each filteredStations as station}

      <div class="flex flex-row justify-between station" on:click={() => onClickStation(station)}>

        <div class="flex flex-1">{station.name}</div>

        <div class="flex flex-3 ellipsis">{station.url}</div>

        {#if station.favorite === true}

          <div class="flex flex-1 justify-end">

            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill flex align-self-center fav-true ma-r-2" viewBox="0 0 16 16">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>

          </div>

        {:else}

          <div class="flex flex-1 justify-end">

            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star flex align-self-center fav-false ma-r-2" viewBox="0 0 16 16">
              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
            </svg>

          </div>

        {/if}

      </div>

    {/each}

    </div>

  {:else}

    <div class="flex flex-1 flex-row justify-between station no-hover">

      <div class="flex flex-1 flex-column justify-center">

        <h2 class="flex align-center self-center">No radio station found</h2>

        <p class="flex align-center self-center ma-all-0">Name "{searchTerm}" is not in the list</p>

      </div>

    </div>

  {/if}

</div>


<style lang="scss">

  .station{
    background-color: #060d13;
    color: #fff;
    padding: 1.2rem .5rem;
    opacity: 0.8;
    cursor: pointer;
    border: 1px solid #293a56;
    width: 100%;
    transition: all 0.4s ease-in-out;
}

.station:nth-child(odd) {
    background-color: rgb(11, 18, 28, 1)
}

.station {

  &:first-child {
    border-top-left-radius: .25rem;
    border-top-right-radius: .25rem;
  }
  &:last-child {
    border-bottom-left-radius: .25rem;
    border-bottom-right-radius: .25rem;
  }

}

.station:hover {

  background-color: #fff;
  color: #060d13;
  padding: 1.2rem .5rem;
  opacity: 0.8;
  border: 1px solid #242424;
  width: 100%;
}

.station.no-hover {

  border-top-left-radius: .25rem;
  border-top-right-radius: .25rem;
  width: 100%;
  h2 {
    color: #fff;
  }
}
.station.no-hover:hover {

  background-color: #060d13;
  color: #fff;

}

.stations-list {
    background-color: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    padding: 1rem;
    margin: 1rem;
  }

.station-header {
    background-color: #060d13;
    color: #fff;
    margin-bottom: .5rem;
    padding: 1rem .5rem;
    opacity: 0.8;
    border-radius: 0.25rem;
    border: 1px solid #fff;
}

.filter-input {

  border-color: #202020;
}

</style>