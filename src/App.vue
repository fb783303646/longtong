<template>
	<div id="app">
		<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>
<script>

export default {
 name: 'app'
}
</script>

<style>

	html{
		height:100%;
		width:100%;
	}
  body{
    margin:0;
		height:100%;
		width:100%;
  }
	#app{
		height:100%;
		width:100%;
	}
</style>
