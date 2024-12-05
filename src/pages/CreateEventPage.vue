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
                outlined 
                v-model="eventname"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
                />
              </div>
              <div>
                <p>Theme</p>
                <q-input 
                outlined
                v-model="eventtheme"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]" 
                />
              </div>
              <div>
                <p>Description</p>
                <q-input 
                outlined 
                type="textarea" 
                v-model="eventDescription"
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
                <q-input 
                outlined 
                type="textarea" 
                v-model="submissionRules"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
                />
              </div>
              <div>
                <p>Voting Criteria</p>
                <q-input 
                outlined 
                type="textarea" 
                v-model="votingCriteria"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
                />
              </div>
              <div>
                <p>Prizes</p>
                <q-input 
                outlined 
                type="textarea" 
                v-model="prizes"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
                />
              </div>

              <div class="row q-pt-sm">
                <div class="col q-mr-sm">
                  <p>Event Type</p>
                  <q-select 
                  outlined 
                  :options="options"
                  v-model="eventType"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]" 
                  />
                </div>
                <div class="col q-ml-sm">
                  <p>Category</p>
                  <q-select 
                  outlined 
                  options="options" 
                  v-model="eventCategory"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]" 
                  />
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

// Event Form Data
const eventname = ref("");
const eventtheme = ref("");
const eventDescription = ref(""); // Fixed the v-model issue
const submissionRules = ref("");
const votingCriteria = ref("");
const prizes = ref("");
const eventType = ref("");
const eventCategory = ref("");
const startDate = ref(""); // Changed from date to startDate
const endDate = ref(""); // Changed from date to endDate
const selectedJudges = ref([]); // For multiple judge selection
const files = ref(null);

// User and Options data (dummy data for example purposes)
const userOptions = ref([
  { label: "Judge 1", value: "judge1" },
  { label: "Judge 2", value: "judge2" },
  { label: "Judge 3", value: "judge3" }
]);

const options = ref([
  { label: "Type 1", value: "type1" },
  { label: "Type 2", value: "type2" },
  { label: "Type 3", value: "type3" }
]);

const categories = ref([
  { label: "Category A", value: "categoryA" },
  { label: "Category B", value: "categoryB" },
  { label: "Category C", value: "categoryC" }
]);

// Loading state for judges search (for async operations)
const loading = ref(false);

// Method for filtering users when searching for judges
const filterUsers = (val, update) => {
  update(() => {
    if (val === "") {
      return userOptions.value;
    }
    return userOptions.value.filter(option => option.label.toLowerCase().includes(val.toLowerCase()));
  });
};

// Method to handle form submission (example)
const onSubmit = () => {
  console.log("Form Submitted", {
    eventname: eventname.value,
    eventtheme: eventtheme.value,
    eventDescription: eventDescription.value,
    submissionRules: submissionRules.value,
    votingCriteria: votingCriteria.value,
    prizes: prizes.value,
    eventType: eventType.value,
    eventCategory: eventCategory.value,
    startDate: startDate.value,
    endDate: endDate.value,
    selectedJudges: selectedJudges.value,
    files: files.value,
  });
};

// Method to handle form reset
const onReset = () => {
  eventname.value = "";
  eventtheme.value = "";
  eventDescription.value = "";
  submissionRules.value = "";
  votingCriteria.value = "";
  prizes.value = "";
  eventType.value = "";
  eventCategory.value = "";
  startDate.value = "";
  endDate.value = "";
  selectedJudges.value = [];
  files.value = null;
};
</script>

