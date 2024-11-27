<template>
  <q-page-container>
    <q-page class="flex flex-center">
      <div class="q-pa-sm" style="width: 100%; max-width: 720px">
        <q-card class="q-pa-sm">
          <q-card-section>
            <div class="text-h5">Create Challenge</div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <q-form class="q-pt-sm q-gutter-md text-weight-bold">
              <div>
                <p>Event Name*</p>
                <q-input outlined />
              </div>
              <div>
                <p>Theme</p>
                <q-input outlined />
              </div>
              <div>
                <p>Description</p>
                <q-input v-model="text" outlined type="textarea" />
              </div>

              <div>
                <p>Judges</p>
                <q-select
                  v-model="selectedJudges"
                  :options="userOptions"
                  multiple
                  outlined
                  label="Search and Select Judges"
                  emit-value
                  map-options
                  :loading="loading"
                  @filter="onSearch"
                  use-input
                  input-debounce="500"
                  :filter-method="filterUsers"
                />
              </div>

              <div>
                <p>Submission Rules</p>
                <q-input v-model="text" outlined type="textarea" />
              </div>
              <div>
                <p>Voting Criteria</p>
                <q-input v-model="text" outlined type="textarea" />
              </div>
              <div>
                <p>Prizes</p>
                <q-input v-model="text" outlined type="textarea" />
              </div>

              <div class="row q-pt-sm">
                <div class="col q-mr-sm">
                  <p>Event Type</p>
                  <q-select outlined v-model="model" :options="options" />
                </div>
                <div class="col q-ml-sm">
                  <p>Category</p>
                  <q-select outlined v-model="model" :options="options" />
                </div>
              </div>

              <!-- Date Time -->
              <q-separator />
              <div class="row q-pt-sm">
                <div class="col q-mr-sm">
                  <p>Start</p>
                  <q-input outlined v-model="date">
                    <template v-slot:prepend>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>

                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time
                            v-model="date"
                            mask="YYYY-MM-DD HH:mm"
                            format24h
                          >
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col q-ml-sm">
                  <p>End</p>
                  <q-input outlined v-model="date">
                    <template v-slot:prepend>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>

                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time
                            v-model="date"
                            mask="YYYY-MM-DD HH:mm"
                            format24h
                          >
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>

              <div>
                <p>Upload Banner</p>
                <q-input
                  @update:model-value="
                    (val) => {
                      files = val;
                    }
                  "
                  multiple
                  filled
                  accept="image/*"
                  type="file"
                />
              </div>

              <div align="right">
                <q-btn
                  label="Next"
                  type="submit"
                  elevated
                  color="pink-13"
                  class="q-ma-sm"
                />
                <q-btn label="Reset" type="reset" flat class="q-ml-sm" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </q-page>
  </q-page-container>
</template>

<script setup>
import { ref } from "vue";

defineOptions({
  name: "CreateEvent",
});
</script>
