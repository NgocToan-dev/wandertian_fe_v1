<template>
  <fwb-footer class="border-t-2">
    <fwb-footer-copyright
      by="Wandertian"
      href="https://flowbite.com/"
      copyright-message="All Rights Reserved."
    />
    <fwb-footer-link-group>
      <fwb-footer-link href="#"> About </fwb-footer-link>
      <fwb-footer-link href="#"> Privacy Policy </fwb-footer-link>
      <fwb-footer-link href="#"> Licensing </fwb-footer-link>
      <fwb-footer-link href="#"> Contact </fwb-footer-link>
    </fwb-footer-link-group>
  </fwb-footer>
</template>

<script setup>
import {
  FwbFooter,
  FwbFooterCopyright,
  FwbFooterLinkGroup,
  FwbFooterLink,
} from "flowbite-vue";
</script>

<style lang="postcss" scoped></style>
