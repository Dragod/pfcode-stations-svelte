<script lang="ts" >

  import Stations from "./components/Stations.svelte"

  import ListenStation from "./components/ListenStation.svelte"

  let selectedStation = null

  function handleStationClick(event:any) {

    selectedStation = event.detail.station

  }

</script>

<div class="flex flex-1 flex-row station">

  <div class="flex flex-1"></div>

  <div class="flex flex-3">

    <Stations on:click={handleStationClick} />

  </div>

  <div class="flex flex-1 pa-all-1">

    {#if selectedStation}

      <ListenStation station={selectedStation} />

    {/if}

  </div>

</div>

<style lang="scss">

</style>
