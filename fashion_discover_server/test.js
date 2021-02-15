const moment = require('moment');

const test = {
  uploadfile: '54067daf-c627-4230-a152-8bebc4572584.jpg',
  labels: [
    'Joint',
    'Lip',
    'Outerwear',
    'Hairstyle',
    'Shoulder',
    'Photograph',
    'Tartan',
    'White',
    'Fashion',
    'Black',
    'Dress shirt',
    'Eyelash',
    'Street fashion',
    'Neck',
    'Textile',
    'Sleeve',
    'Waist',
    'Eyewear',
    'Thigh',
    'Collar'
  ],
  fashionSet: [
    {
      name: 'Outerwear',
      labels: [
        'Joint',
        'Outerwear',
        'Shoulder',
        'Arm',
        'Tartan',
        'Street fashion',
        'Black',
        'Neck',
        'Fashion',
        'Vision care',
        'Eyelash',
        'Eyewear',
        'Sleeve',
        'Textile',
        'Waist',
        'Sunglasses',
        'Gesture',
        'Thigh',
        'Collar',
        'Style'
      ],
      fashionFiles: [
        '54067daf-c627-4230-a152-8bebc4572584_Outerwear_0.jpg'
      ],
      logos: [],
      text: []
    },
    {
      logos: [
        'Yves Saint Laurent'
      ],
      labels: [
        'Art',
        'Fashion accessory',
        'Metal',
        'Electric blue',
        'Insect',
        'Rectangle',
        'Soil',
        'Natural material',
        'Pattern'
      ],
      text: [],
      name: 'Bag',
      fashionFiles: [
        '54067daf-c627-4230-a152-8bebc4572584_Bag_1.jpg'
      ]
    },
    {
      labels: [
        'Outerwear',
        'Black',
        'Neck',
        'Sleeve',
        'Street fashion',
        'Natural material',
        'Fashion design',
        'Font',
        'Pattern',
        'Bag',
        'Tartan',
        'Magenta',
        'T-shirt',
        'Fashion accessory',
        'Electric blue',
        'Denim',
        'Plaid',
        'Jewellery',
        'Embellishment',
        'Fur'
      ],
      logos: [
        'Yves Saint Laurent'
      ],
      text: [],
      fashionFiles: [
        '54067daf-c627-4230-a152-8bebc4572584_Skirt_2.jpg'
      ],
      name: 'Skirt'
    }
  ],
  uuid: '54067daf-c627-4230-a152-8bebc4572584'
}

let excludes = ['Art','Insect','Soil','Lip','Hairstyle','Photograph','Eyelash','Neck', 'Electric blue', 'Rectangle', 
                'Natural material', 'Joint', 'Outerwear', 'Shoulder', 'Fashion', 'Textile','Waist', 'Thigh']

const excludeInfos = (labels) => {
  let includes = [];
  labels.forEach(label => {
    if (excludes.findIndex(exclude => exclude === label) === -1) {
      includes.push(label)
    }
  });
  return includes;
}

const mergeLabels = (fashion, piece) => {
  piece[0].labels = piece[0].labels.concat(fashion.labels)
  piece[0].labels = Array.from(new Set(piece[0].labels))
  piece[0].labels = excludeInfos(piece[0].labels);
  return piece;
}

const getFashionPiece = (fashion, part) => {
  let piece = fashion.fashionSet.filter(p => p.name === part);
  piece = mergeLabels(fashion, piece);
  return piece;
}

// getFashionPiece(test,'Bag');
let testDate = '2018-10-30+01:00'
testDate = testDate.substring(0,10);

//let date = new Date();
const diffInDays = moment().diff(moment(testDate), 'days');
console.log(diffInDays);
//const today = moment().format('YYYY-MM-DD');
//console.log(today);
//const diffInDays = moment().diff('2019-10-30+01:00', 'days');
//console.log(diffInDays);