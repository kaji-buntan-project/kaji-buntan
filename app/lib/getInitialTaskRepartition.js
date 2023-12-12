import constants from "../src/constants";

  // Functions regarding the task repartition state -=-=-=-=-=-=-=-
  // Creating the initial value
export function getInitialTaskRepartition() {

const myTasks = {};
const partnerTasks = {};

for (let categoryObject of constants.allTasks) {
    for (let taskObject of categoryObject.children) {
        myTasks[taskObject.name] = {
            participates: 3,
            effort: 0,
            duration : 10,
            category : categoryObject.name,
            userModified: false,
        };
        partnerTasks[taskObject.name] = {
            participates: 4,
            effort: 0,
            duration : 10,
            category : categoryObject.name,
            userModified: false,
        }
    }
}

return { myTasks: myTasks, partnerTasks: partnerTasks};
}