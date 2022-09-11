const allTasks = [
    {
        name: "Living room",
        children: [
            {name: 'Set dinner table', checked: false},
            {name: 'Clear dinner table', checked: false},
            {name: 'Tidy living room', checked: false},
            {name: 'Vaccum', checked: false},
            {name: 'Dust furniture', checked: false},
            {name: 'Clean windows', checked: false},
        ],
    }, {
        name: "Kitchen",
        children: [
            {name: 'Make breakfast', checked: false},
            {name: 'Make dinner', checked: false},
            {name: 'Pack lunch', checked: false},
            {name: 'Write grocery list', checked: false},
            {name: 'Grocery shopping', checked: false},
            {name: 'Clean micorwave', checked: false},
            {name: 'Sweep & mop kitchen floor', checked: false},
            {name: 'Calean appliances', checked: false},
            {name: 'Sort out items in pantry', checked: false},
            {name: 'Clear out fridge/wipe shelves', checked: false},
            {name: 'Wash dishes', checked: false},
            {name: 'Dry dishes', checked: false},
            {name: 'Load dishwater', checked: false},
            {name: 'Unload dishwater', checked: false},
        ],
    }, {
        name: "Bathroom",
        children: [
            {name: 'Wipe down bathroom counter', checked: false},
            {name: 'Change & clean towels', checked: false},
            {name: 'Clean & mop floor', checked: false},
            {name: 'Empty garbage can', checked: false},
            {name: 'Clean bathtub', checked: false},
            {name: 'Clean toilet', checked: false},
        ],
    }, {
        name: "Household",
        children: [
            {name: 'Take out trash, compost & recycling', checked: false},
            {name: 'Check mail', checked: false},
            {name: 'Sort mail', checked: false},
            {name: 'Wash & fold laundry', checked: false},
            {name: 'Iron clothing', checked: false},
        ],
    }, {
        name: "Bedroom",
        children: [
            {name: 'Clean & mop floor', checked: false},
            {name: 'Change & clean bedding', checked: false},
            {name: 'Empty garbage can', checked: false},
            {name: 'Dust furniture', checked: false},
        ],
    }, {
        name: "Outdoor",
        children: [
            {name: 'Rake leaves', checked: false},
            {name: 'Clean car', checked: false},
            {name: 'Weed garden', checked: false},
            {name: 'Feed pets', checked: false},
            {name: 'Walk dog', checked: false},
            {name: 'Water plants', checked: false},
            {name: 'Mow the lawn', checked: false},
        ],
    },
];

const backgroundColorList = {
    'Living room' : 'rgba(255, 99, 132, 0.2)',
    'Kitchen' : 'rgba(75, 192, 192, 0.2)',
    'Bathroom' : 'rgba(54, 162, 235, 0.2)',
    'Household' : 'rgba(153, 102, 255, 0.2)',
    'Bedroom' : 'rgba(255, 255, 0, 0.2)',
    'Outdoor' : 'rgba(139, 0, 139, 0.2)',
    '料理' : 'rgba(2, 203, 2, 0.2)',
    'お風呂の準備' : 'rgba(0, 0, 207, 0.2)',
    '掃除 (家全体)' : 'rgba(210 ,180 ,140, 0.2)',
    '家庭内の雑用' : 'rgba(201, 201, 20, 0.2)',
    '子供・学校' : 'rgba(210 ,180 ,140, 0.2)',
    'ゴミ捨て' : 'rgba(139, 30, 139, 0.2)',
    'ペット関連' : 'rgba(201, 20, 20, 0.2)',
    '介護' : 'rgba(0, 0, 207, 0.2)',
}
const borderColorList = {
    'Living room' : 'rgba(255, 99, 132)',
    'Kitchen' : 'rgba(75, 192, 192)',
    'Bathroom' : 'rgba(54, 162, 235)',
    'Household' : 'rgba(153, 102, 255)',
    'Bedroom' : 'rgba(255, 255, 0)',
    'Outdoor' : 'rgba(139, 0, 139)',
    '料理' : 'rgba(2, 203, 2)',
    'お風呂の準備' : 'rgba(0, 0, 207)',
    '掃除 (家全体)' : 'rgba(210 ,180 ,140)',
    '家庭内の雑用' : 'rgba(201, 201, 20)',
    '子供・学校' : 'rgba(210 ,180 ,140)',
    'ゴミ捨て' : 'rgba(139, 30, 139)',
    'ペット関連' : 'rgba(201, 20, 20)',
    '介護' : 'rgba(0, 0, 207)',
}

const myBackColor = 'rgba(255, 138, 128 ,0.3)'
const myBackColorBorder = 'rgba(255, 138, 128)'

const partnerBackColor = 'rgba(140, 158, 255, 0.3)'
const partnerBackColorBorder = 'rgba(140, 158, 255)'

export default { allTasks, backgroundColorList, borderColorList, myBackColor, partnerBackColor, myBackColorBorder, partnerBackColorBorder};

