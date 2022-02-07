<template>
  <b-form-group
    horizontal
    :label="label"
    :label-cols="4"
    :label-for="id"
    label-text-align="right"
    breakpoint="md"
  >
    <input
      @change="uploadFile"
      :id="id"
      type="file"
      name="file"
      class="d-none"
      multiple
    />
    <b-input-group-append>
      <b-button type="button" variant="default" class="btn-file">
        <label class="mb-0" :for="id">Select file</label>
      </b-button>
    </b-input-group-append>

    <div class="mt-2" v-if="files && files.length">
      <a
        v-for="(file, idx) in files"
        :key="`select-id-${idx}${file.name.split('.')[0].toString()}`"
        :href="file.publicUrl"
        class="d-block"
      >
        {{ file.name }}
        <i class="la la-times" @click.prevent="$emit('del', file.id)"></i>
      </a>
    </div>
  </b-form-group>
</template>

<script>
  import * as uuid from 'uuid/v4';
  import axios from 'axios';
  import config from '@/config';

  export default {
    name: 'fileUploader',
    props: {
      id: {
        type: String,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
      files: {
        type: [Array, undefined],
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    emits: ['del', 'change'],
    methods: {
      async uploadFile(event) {
        const formData = new FormData();
        const files = event.target.files;
        if (!files || !files.length) {
          return;
        }
        let file = files[0];
        const extension = this.extractExtensionFrom(file.name);
        const id = uuid();
        const privateUrl = `/products/image/${id}.${extension}`;
        const publicUrl = `${config.baseURLApi}/file/download?privateUrl=products/image/${id}.${extension}`;
        formData.append('file', file);
        formData.append('filename', `${id}.${extension}`);
        try {
          await axios.post(`/file/upload/${this.url}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          this.$toasted.show('File has been uploaded', {
            type: 'success',
          });

          this.$emit('change', {
            id,
            name: file.name,
            sizeInBytes: file.size,
            privateUrl,
            publicUrl,
            new: true,
          });
        } catch (e) {
          this.$toasted.show('Error: ' + e, {
            type: 'error',
          });
        }
      },
      extractExtensionFrom(filename) {
        if (!filename) {
          return null;
        }

        const regex = /(?:\.([^.]+))?$/;
        return regex.exec(filename)[1];
      },
    },
  };
</script>
