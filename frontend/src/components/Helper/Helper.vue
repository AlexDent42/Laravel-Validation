<template>
  <div :class="{ 'theme-helper': true, 'theme-helper-opened': opened }">
    <section class="widget theme-helper-content">
      <header class="theme-helper-header d-flex p-0">
        <div class="theme-helper-toggler" @click="toggle">
          <div class="theme-helper-spinner text-white">
            <i class="la la-cog"></i>
            <i class="la la-cog"></i>
          </div>
        </div>
        <h6>Links</h6>
      </header>
      <div class="widget-body mt-3">
        <div class="d-flex justify-content-between mt-lg">
          <a
            role="button"
            target="_blank"
            href="https://flatlogic.com/generator"
            class="
              btn btn-outline-default btn-rounded-f
              fs-mini
              text-muted
              d-flex
              align-items-center
            "
          >
            Generator
          </a>
          <a
            role="button"
            target="_blank"
            href="https://github.com/okendoken/templates"
            class="
              btn btn-outline-default btn-rounded-f
              fs-mini
              text-muted
              d-flex
              align-items-center
            "
          >
            <i class="fa fa-github mr-xs"></i>
            Github
          </a>
        </div>
        <div class="mt-lg d-flex flex-column align-items-center theme-sharing">
          <span class="fs-sm"> You can put your settings here </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'Helper',
    data() {
      return {
        opened: false,
      };
    },
    methods: {
      toggle() {
        this.opened = !this.opened;
      },
    },
  };
</script>

<style src="./Helper.scss" lang="scss" scoped />
