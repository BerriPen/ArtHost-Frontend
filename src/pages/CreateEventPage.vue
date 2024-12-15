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
                <q-input
                  v-model="eventName"
                  outlined
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
              </div>
              <div>
                <p>Theme</p>
                <q-input
                  v-model="eventTheme"
                  outlined
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
              </div>
              <div>
                <p>Description</p>
                <q-input
                  v-model="eventDesc"
                  outlined
                  type="textarea"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
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
                <q-input v-model="subRules" outlined type="textarea" />
              </div>
              <div>
                <p>Voting Criteria</p>
                <q-input v-model="voteCriteria" outlined type="textarea" />
              </div>
              <div>
                <p>Prizes</p>
                <q-input v-model="prizes" outlined type="textarea" />
              </div>

              <div class="row q-pt-sm">
                <div class="col q-mr-sm">
                  <p>Event Type</p>
                  <q-select outlined v-model="eventType" :options="options" />
                </div>
                <div class="col q-ml-sm">
                  <p>Category</p>
                  <q-select outlined v-model="eventCat" :options="options" />
                </div>
              </div>

              <!-- Date Time -->
              <q-separator />
              <div class="row q-pt-sm">
                <div class="col q-mr-sm">
                  <p>Start</p>
                  <q-input outlined v-model="startDate">
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
                          <q-time v-model="date">
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
                  <q-input outlined v-model="endDate">
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
                          <q-time v-model="date">
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
import axios from "axios";

const eventName = ref("");
const eventTheme = ref("");
const eventDesc = ref("");
const selectedJudges = ref("");
const subRules = ref("");
const voteCriteria = ref("");
const prizes = ref("");
const eventType = ref("");
const eventCat = ref("");
const startDate = ref("");
const endDate = ref("");
const files = ref([]);

const createEvent = async () => {};

defineOptions({
  name: "CreateEvent",
});
</script>
