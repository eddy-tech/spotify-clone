<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<style lang="scss">
    @use "src/styles/functions";
   h1 {
    color: green;
    font-size: functions.toRem(50);
    // @include breakpoint.up('md'){
    //     color: red;
    // }
    // @include breakpoint.up('lg'){
    //     color: blue;
    // }
   }
</style>
