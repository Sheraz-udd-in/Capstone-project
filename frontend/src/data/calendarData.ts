import { CalendarData } from '../types';

export interface CalendarMonth {
  month: string;
  phase: 'sowing' | 'growing' | 'harvesting' | 'none';
  activities: string[];
}

export interface CropCalendarData {
  id: string;
  name: string;
  months: CalendarMonth[];
}

export const calendarDataEn: CropCalendarData[] = [
  {
    id: 'rice',
    name: 'Rice (Kharif)',
    months: [
      { month: 'June', phase: 'sowing', activities: ['Land preparation', 'Nursery raising', 'Seed treatment'] },
      { month: 'July', phase: 'sowing', activities: ['Transplanting seedlings', 'Basal fertilizer application'] },
      { month: 'August', phase: 'growing', activities: ['Weed management', 'Top dressing of Nitrogen', 'Water management'] },
      { month: 'September', phase: 'growing', activities: ['Pest and disease monitoring', 'Late top dressing'] },
      { month: 'October', phase: 'harvesting', activities: ['Drain water from field', 'Harvesting early varieties'] },
      { month: 'November', phase: 'harvesting', activities: ['Harvesting main crop', 'Drying and threshing'] },
      { month: 'December', phase: 'none', activities: ['Storage preparation', 'Post-harvest management'] },
      { month: 'January', phase: 'none', activities: [] },
      { month: 'February', phase: 'none', activities: [] },
      { month: 'March', phase: 'none', activities: [] },
      { month: 'April', phase: 'none', activities: [] },
      { month: 'May', phase: 'none', activities: ['Field clearing', 'Summer ploughing'] }
    ]
  },
  {
    id: 'wheat',
    name: 'Wheat (Rabi)',
    months: [
      { month: 'November', phase: 'sowing', activities: ['Land preparation', 'Basal fertilizer application', 'Sowing'] },
      { month: 'December', phase: 'growing', activities: ['First irrigation (CRI stage)', 'Weed control', 'Top dressing N'] },
      { month: 'January', phase: 'growing', activities: ['Second irrigation', 'Disease monitoring (Rust)'] },
      { month: 'February', phase: 'growing', activities: ['Third irrigation', 'Pest management'] },
      { month: 'March', phase: 'growing', activities: ['Final irrigation during grain filling'] },
      { month: 'April', phase: 'harvesting', activities: ['Harvesting when grains are hard', 'Threshing'] },
      { month: 'May', phase: 'none', activities: ['Storage and bagging'] },
      { month: 'June', phase: 'none', activities: [] },
      { month: 'July', phase: 'none', activities: [] },
      { month: 'August', phase: 'none', activities: [] },
      { month: 'September', phase: 'none', activities: [] },
      { month: 'October', phase: 'none', activities: ['Pre-sowing irrigation'] }
    ]
  },
  {
    id: 'cotton',
    name: 'Cotton',
    months: [
      { month: 'May', phase: 'sowing', activities: ['Deep summer ploughing', 'Land preparation'] },
      { month: 'June', phase: 'sowing', activities: ['Sowing with onset of monsoon', 'Weed control'] },
      { month: 'July', phase: 'growing', activities: ['Gap filling', 'First top dressing'] },
      { month: 'August', phase: 'growing', activities: ['Pest monitoring (Bollworm)', 'Second top dressing'] },
      { month: 'September', phase: 'growing', activities: ['Disease management', 'Square formation stage care'] },
      { month: 'October', phase: 'growing', activities: ['Boll development care', 'Irrigation if needed'] },
      { month: 'November', phase: 'harvesting', activities: ['First picking of open bolls'] },
      { month: 'December', phase: 'harvesting', activities: ['Second picking', 'Grading'] },
      { month: 'January', phase: 'harvesting', activities: ['Final picking', 'Stalk removal'] },
      { month: 'February', phase: 'none', activities: [] },
      { month: 'March', phase: 'none', activities: [] },
      { month: 'April', phase: 'none', activities: [] }
    ]
  },
  {
    id: 'sugarcane',
    name: 'Sugarcane',
    months: [
      { month: 'January', phase: 'sowing', activities: ['Land preparation', 'Sets treatment', 'Planting (Spring)'] },
      { month: 'February', phase: 'sowing', activities: ['Planting completion', 'First irrigation'] },
      { month: 'March', phase: 'growing', activities: ['Weed control', 'First top dressing of Nitrogen'] },
      { month: 'April', phase: 'growing', activities: ['Frequent irrigation', 'Earthling up (early)'] },
      { month: 'May', phase: 'growing', activities: ['Second top dressing', 'Pest monitoring (Borers)'] },
      { month: 'June', phase: 'growing', activities: ['Main earthling up', 'Tying of canes'] },
      { month: 'July', phase: 'growing', activities: ['Drainage management', 'Disease monitoring'] },
      { month: 'August', phase: 'growing', activities: ['Propping of canes to prevent lodging'] },
      { month: 'September', phase: 'growing', activities: ['Irrigation management'] },
      { month: 'October', phase: 'growing', activities: ['Stop irrigation before harvest'] },
      { month: 'November', phase: 'harvesting', activities: ['Harvesting early varieties', 'Ratoon management'] },
      { month: 'December', phase: 'harvesting', activities: ['Main harvesting', 'Transport to mills'] }
    ]
  },
  {
    id: 'maize',
    name: 'Maize (Kharif)',
    months: [
      { month: 'June', phase: 'sowing', activities: ['Land preparation', 'Basal fertilizer application', 'Sowing'] },
      { month: 'July', phase: 'growing', activities: ['Thinning', 'First top dressing (Knee-high stage)'] },
      { month: 'August', phase: 'growing', activities: ['Tasseling & Silking care', 'Second top dressing', 'Pest control (Fall Armyworm)'] },
      { month: 'September', phase: 'harvesting', activities: ['Harvesting cobs', 'Drying'] },
      { month: 'October', phase: 'none', activities: ['Shelling and Storage'] },
      { month: 'November', phase: 'none', activities: [] },
      { month: 'December', phase: 'none', activities: [] },
      { month: 'January', phase: 'none', activities: [] },
      { month: 'February', phase: 'none', activities: [] },
      { month: 'March', phase: 'none', activities: [] },
      { month: 'April', phase: 'none', activities: [] },
      { month: 'May', phase: 'none', activities: ['Deep summer ploughing'] }
    ]
  },
  {
    id: 'soybean',
    name: 'Soybean',
    months: [
      { month: 'June', phase: 'sowing', activities: ['Seed treatment with Rhizobium', 'Sowing after first monsoon rain'] },
      { month: 'July', phase: 'growing', activities: ['Weeding (20-25 days after sowing)', 'Pest monitoring'] },
      { month: 'August', phase: 'growing', activities: ['Flowering stage care', 'Foliar spray if needed'] },
      { month: 'September', phase: 'growing', activities: ['Pod formation', 'Disease control (Yellow mosaic)'] },
      { month: 'October', phase: 'harvesting', activities: ['Harvesting when leaves turn yellow and drop', 'Threshing'] },
      { month: 'November', phase: 'none', activities: ['Storage'] },
      { month: 'December', phase: 'none', activities: [] },
      { month: 'January', phase: 'none', activities: [] },
      { month: 'February', phase: 'none', activities: [] },
      { month: 'March', phase: 'none', activities: [] },
      { month: 'April', phase: 'none', activities: [] },
      { month: 'May', phase: 'none', activities: ['Land preparation'] }
    ]
  },
  {
    id: 'potato',
    name: 'Potato',
    months: [
      { month: 'September', phase: 'none', activities: ['Procurement of seed tubers', 'Cold storage removal'] },
      { month: 'October', phase: 'sowing', activities: ['Land preparation', 'Ridge making', 'Planting of tubers'] },
      { month: 'November', phase: 'growing', activities: ['First irrigation', 'Earthing up', 'Top dressing N'] },
      { month: 'December', phase: 'growing', activities: ['Disease monitoring (Late Blight)', 'Fungicide application'] },
      { month: 'January', phase: 'growing', activities: ['Frost protection', 'Haulm cutting (10-15 days before harvest)'] },
      { month: 'February', phase: 'harvesting', activities: ['Digging out tubers', 'Curing in shade'] },
      { month: 'March', phase: 'none', activities: ['Grading', 'Cold storage'] },
      { month: 'April', phase: 'none', activities: [] },
      { month: 'May', phase: 'none', activities: [] },
      { month: 'June', phase: 'none', activities: [] },
      { month: 'July', phase: 'none', activities: [] },
      { month: 'August', phase: 'none', activities: [] }
    ]
  },
  {
    id: 'mustard',
    name: 'Mustard (Rapeseed)',
    months: [
      { month: 'September', phase: 'sowing', activities: ['Pre-sowing irrigation', 'Land preparation'] },
      { month: 'October', phase: 'sowing', activities: ['Sowing', 'Basal dose of fertilizers (Sulphur is important)'] },
      { month: 'November', phase: 'growing', activities: ['First irrigation (35-40 days)', 'Thinning', 'Weed control'] },
      { month: 'December', phase: 'growing', activities: ['Flowering stage', 'Pest monitoring (Aphids)'] },
      { month: 'January', phase: 'growing', activities: ['Pod formation', 'Second irrigation', 'Frost protection'] },
      { month: 'February', phase: 'harvesting', activities: ['Harvesting when 75% pods turn yellow'] },
      { month: 'March', phase: 'none', activities: ['Drying', 'Threshing', 'Storage'] },
      { month: 'April', phase: 'none', activities: [] },
      { month: 'May', phase: 'none', activities: [] },
      { month: 'June', phase: 'none', activities: [] },
      { month: 'July', phase: 'none', activities: [] },
      { month: 'August', phase: 'none', activities: [] }
    ]
  },
  {
    id: 'groundnut',
    name: 'Groundnut (Kharif)',
    months: [
      { month: 'June', phase: 'sowing', activities: ['Seed treatment with Trichoderma', 'Sowing with monsoon'] },
      { month: 'July', phase: 'growing', activities: ['Weeding', 'Gypsum application (Flowering stage)'] },
      { month: 'August', phase: 'growing', activities: ['Pegging stage (Do NOT disturb soil)', 'Pest monitoring (White grub)'] },
      { month: 'September', phase: 'growing', activities: ['Pod development', 'Disease control (Tikka disease)'] },
      { month: 'October', phase: 'harvesting', activities: ['Harvesting when vines turn yellow', 'Pod plucking'] },
      { month: 'November', phase: 'none', activities: ['Drying of pods', 'Storage'] },
      { month: 'December', phase: 'none', activities: [] },
      { month: 'January', phase: 'none', activities: [] },
      { month: 'February', phase: 'none', activities: [] },
      { month: 'March', phase: 'none', activities: [] },
      { month: 'April', phase: 'none', activities: [] },
      { month: 'May', phase: 'none', activities: ['Summer ploughing'] }
    ]
  },
  {
    id: 'bajra',
    name: 'Bajra',
    months: [
      { month: 'June', phase: 'sowing', activities: ['Land preparation', 'Sowing with first monsoon'] },
      { month: 'July', phase: 'growing', activities: ['Thinning', 'Weed management'] },
      { month: 'August', phase: 'growing', activities: ['Top dressing', 'Disease monitoring'] },
      { month: 'September', phase: 'harvesting', activities: ['Harvesting of earheads'] },
      { month: 'October', phase: 'none', activities: ['Drying', 'Threshing'] },
      { month: 'November', phase: 'none', activities: [] },
      { month: 'December', phase: 'none', activities: [] },
      { month: 'January', phase: 'none', activities: [] },
      { month: 'February', phase: 'none', activities: [] },
      { month: 'March', phase: 'none', activities: [] },
      { month: 'April', phase: 'none', activities: [] },
      { month: 'May', phase: 'none', activities: ['Deep summer ploughing'] }
    ]
  },
  {
    id: 'jowar',
    name: 'Jowar',
    months: [
      { month: 'June', phase: 'sowing', activities: ['Land preparation', 'Seed treatment', 'Sowing'] },
      { month: 'July', phase: 'growing', activities: ['Weed control', 'Intercultivation'] },
      { month: 'August', phase: 'growing', activities: ['Top dressing of Nitrogen', 'Pest monitoring'] },
      { month: 'September', phase: 'growing', activities: ['Flowering and grain filling care'] },
      { month: 'October', phase: 'harvesting', activities: ['Harvesting mature earheads'] },
      { month: 'November', phase: 'none', activities: ['Drying', 'Storage'] },
      { month: 'December', phase: 'none', activities: [] },
      { month: 'January', phase: 'none', activities: [] },
      { month: 'February', phase: 'none', activities: [] },
      { month: 'March', phase: 'none', activities: [] },
      { month: 'April', phase: 'none', activities: [] },
      { month: 'May', phase: 'none', activities: ['Field clearing'] }
    ]
  },
  {
    id: 'tomato',
    name: 'Tomato',
    months: [
      { month: 'June', phase: 'sowing', activities: ['Nursery bed preparation', 'Sowing seeds in nursery'] },
      { month: 'July', phase: 'sowing', activities: ['Transplanting seedlings', 'Staking'] },
      { month: 'August', phase: 'growing', activities: ['Weed control', 'Top dressing', 'Disease monitoring'] },
      { month: 'September', phase: 'growing', activities: ['Irrigation', 'Pest management (Fruit borer)'] },
      { month: 'October', phase: 'harvesting', activities: ['First picking of mature fruits'] },
      { month: 'November', phase: 'harvesting', activities: ['Continuous picking', 'Grading'] },
      { month: 'December', phase: 'none', activities: ['Clearing old plants'] },
      { month: 'January', phase: 'none', activities: [] },
      { month: 'February', phase: 'none', activities: [] },
      { month: 'March', phase: 'none', activities: [] },
      { month: 'April', phase: 'none', activities: [] },
      { month: 'May', phase: 'none', activities: ['Soil solarization'] }
    ]
  },
  {
    id: 'pulses',
    name: 'Pulses (Moong/Urad)',
    months: [
      { month: 'June', phase: 'sowing', activities: ['Seed treatment with Rhizobium', 'Sowing after rains'] },
      { month: 'July', phase: 'growing', activities: ['First weeding', 'Pest monitoring (Whitefly)'] },
      { month: 'August', phase: 'growing', activities: ['Flowering stage', 'Foliar spray if required'] },
      { month: 'September', phase: 'harvesting', activities: ['Pod picking', 'Drying'] },
      { month: 'October', phase: 'none', activities: ['Threshing', 'Storage'] },
      { month: 'November', phase: 'none', activities: [] },
      { month: 'December', phase: 'none', activities: [] },
      { month: 'January', phase: 'none', activities: [] },
      { month: 'February', phase: 'none', activities: [] },
      { month: 'March', phase: 'none', activities: [] },
      { month: 'April', phase: 'none', activities: [] },
      { month: 'May', phase: 'none', activities: ['Summer ploughing'] }
    ]
  },
  {
    id: 'sunflower',
    name: 'Sunflower',
    months: [
      { month: 'June', phase: 'sowing', activities: ['Land preparation', 'Sowing seeds'] },
      { month: 'July', phase: 'growing', activities: ['Thinning', 'Weeding', 'First irrigation'] },
      { month: 'August', phase: 'growing', activities: ['Head formation stage', 'Pest monitoring'] },
      { month: 'September', phase: 'harvesting', activities: ['Harvesting mature heads'] },
      { month: 'October', phase: 'none', activities: ['Drying', 'Threshing seeds'] },
      { month: 'November', phase: 'none', activities: [] },
      { month: 'December', phase: 'none', activities: [] },
      { month: 'January', phase: 'none', activities: [] },
      { month: 'February', phase: 'none', activities: [] },
      { month: 'March', phase: 'none', activities: [] },
      { month: 'April', phase: 'none', activities: [] },
      { month: 'May', phase: 'none', activities: [] }
    ]
  },
  {
    id: 'castor',
    name: 'Castor',
    months: [
      { month: 'July', phase: 'sowing', activities: ['Deep ploughing', 'Sowing seeds'] },
      { month: 'August', phase: 'growing', activities: ['Weed control', 'Intercultivation'] },
      { month: 'September', phase: 'growing', activities: ['Pest monitoring (Castor semilooper)'] },
      { month: 'October', phase: 'growing', activities: ['Spike formation', 'Top dressing'] },
      { month: 'November', phase: 'growing', activities: ['Capsule development'] },
      { month: 'December', phase: 'harvesting', activities: ['First picking of primary spikes'] },
      { month: 'January', phase: 'harvesting', activities: ['Secondary picking'] },
      { month: 'February', phase: 'harvesting', activities: ['Final picking'] },
      { month: 'March', phase: 'none', activities: ['Threshing', 'Storage'] },
      { month: 'April', phase: 'none', activities: [] },
      { month: 'May', phase: 'none', activities: [] },
      { month: 'June', phase: 'none', activities: [] }
    ]
  },
  {
    id: 'ragi',
    name: 'Ragi (Finger Millet)',
    months: [
      { month: 'June', phase: 'sowing', activities: ['Nursery raising', 'Field preparation'] },
      { month: 'July', phase: 'sowing', activities: ['Transplanting seedlings'] },
      { month: 'August', phase: 'growing', activities: ['Weed management', 'Top dressing'] },
      { month: 'September', phase: 'growing', activities: ['Flowering and grain filling', 'Disease monitoring'] },
      { month: 'October', phase: 'harvesting', activities: ['Harvesting of earheads'] },
      { month: 'November', phase: 'none', activities: ['Drying', 'Threshing', 'Storage'] },
      { month: 'December', phase: 'none', activities: [] },
      { month: 'January', phase: 'none', activities: [] },
      { month: 'February', phase: 'none', activities: [] },
      { month: 'March', phase: 'none', activities: [] },
      { month: 'April', phase: 'none', activities: [] },
      { month: 'May', phase: 'none', activities: ['Summer ploughing'] }
    ]
  },
  {
    id: 'jute',
    name: 'Jute',
    months: [
      { month: 'March', phase: 'sowing', activities: ['Fine seedbed preparation', 'Sowing seeds'] },
      { month: 'April', phase: 'growing', activities: ['First weeding', 'Thinning'] },
      { month: 'May', phase: 'growing', activities: ['Second weeding', 'Pest monitoring'] },
      { month: 'June', phase: 'growing', activities: ['Rapid vegetative growth', 'Top dressing N'] },
      { month: 'July', phase: 'harvesting', activities: ['Harvesting at small pod stage'] },
      { month: 'August', phase: 'harvesting', activities: ['Retting (steeping in water)'] },
      { month: 'September', phase: 'none', activities: ['Fibre extraction', 'Washing and drying'] },
      { month: 'October', phase: 'none', activities: ['Baling and storage'] },
      { month: 'November', phase: 'none', activities: [] },
      { month: 'December', phase: 'none', activities: [] },
      { month: 'January', phase: 'none', activities: [] },
      { month: 'February', phase: 'none', activities: [] }
    ]
  }
];

export const calendarDataHi: CropCalendarData[] = [
  {
    id: 'rice',
    name: 'चावल (खरीफ)',
    months: [
      { month: 'जून', phase: 'sowing', activities: ['भूमि की तैयारी', 'नर्सरी तैयार करना', 'बीज उपचार'] },
      { month: 'जुलाई', phase: 'sowing', activities: ['पौधरोपण', 'बुनियादी उर्वरक का प्रयोग'] },
      { month: 'अगस्त', phase: 'growing', activities: ['खरपतवार प्रबंधन', 'नाइट्रोजन का टॉप ड्रेसिंग', 'जल प्रबंधन'] },
      { month: 'सितंबर', phase: 'growing', activities: ['कीट और रोग की निगरानी', 'देर से टॉप ड्रेसिंग'] },
      { month: 'अक्टूबर', phase: 'harvesting', activities: ['खेत से पानी निकालें', 'प्रारंभिक किस्मों की कटाई'] },
      { month: 'नवंबर', phase: 'harvesting', activities: ['मुख्य फसल की कटाई', 'सुखाना और मड़ाई'] },
      { month: 'दिसंबर', phase: 'none', activities: ['भंडारण की तैयारी', 'फसल कटाई के बाद प्रबंधन'] },
      { month: 'जनवरी', phase: 'none', activities: [] },
      { month: 'फरवरी', phase: 'none', activities: [] },
      { month: 'मार्च', phase: 'none', activities: [] },
      { month: 'अप्रैल', phase: 'none', activities: [] },
      { month: 'मई', phase: 'none', activities: ['खेत की सफाई', 'गर्मियों की गहरी जुताई'] }
    ]
  },
  {
    id: 'wheat',
    name: 'गेहूं (रबी)',
    months: [
      { month: 'नवंबर', phase: 'sowing', activities: ['भूमि की तैयारी', 'बुनियादी उर्वरक का प्रयोग', 'बुवाई'] },
      { month: 'दिसंबर', phase: 'growing', activities: ['पहली सिंचाई (CRI चरण)', 'खरपतवार नियंत्रण', 'नाइट्रोजन टॉप ड्रेसिंग'] },
      { month: 'जनवरी', phase: 'growing', activities: ['दूसरी सिंचाई', 'रोग निगरानी (रस्ट/गेरुआ)'] },
      { month: 'फरवरी', phase: 'growing', activities: ['तीसरी सिंचाई', 'कीट प्रबंधन'] },
      { month: 'मार्च', phase: 'growing', activities: ['अनाज भरते समय अंतिम सिंचाई'] },
      { month: 'अप्रैल', phase: 'harvesting', activities: ['दानों के सख्त होने पर कटाई', 'मड़ाई (Threshing)'] },
      { month: 'मई', phase: 'none', activities: ['भंडारण और पैकेजिंग'] },
      { month: 'जून', phase: 'none', activities: [] },
      { month: 'जुलाई', phase: 'none', activities: [] },
      { month: 'अगस्त', phase: 'none', activities: [] },
      { month: 'सितंबर', phase: 'none', activities: [] },
      { month: 'अक्टूबर', phase: 'none', activities: ['बुवाई से पूर्व सिंचाई'] }
    ]
  },
  {
    id: 'cotton',
    name: 'कपास',
    months: [
      { month: 'मई', phase: 'sowing', activities: ['गर्मियों की गहरी जुताई', 'भूमि की तैयारी'] },
      { month: 'जून', phase: 'sowing', activities: ['मानसून की शुरुआत के साथ बुवाई', 'खरपतवार नियंत्रण'] },
      { month: 'जुलाई', phase: 'growing', activities: ['गैप फिलिंग (खाली जगह भरना)', 'पहली टॉप ड्रेसिंग'] },
      { month: 'अगस्त', phase: 'growing', activities: ['कीट निगरानी (बॉलवर्म)', 'दूसरी टॉप ड्रेसिंग'] },
      { month: 'सितंबर', phase: 'growing', activities: ['रोग प्रबंधन', 'स्क्वायर (फूल) बनने के चरण में देखभाल'] },
      { month: 'अक्टूबर', phase: 'growing', activities: ['बॉल (टिंडे) विकास की देखभाल', 'आवश्यकतानुसार सिंचाई'] },
      { month: 'नवंबर', phase: 'harvesting', activities: ['खुले टिंडों की पहली चुनाई'] },
      { month: 'दिसंबर', phase: 'harvesting', activities: ['दूसरी चुनाई', 'ग्रेडिंग'] },
      { month: 'जनवरी', phase: 'harvesting', activities: ['अंतिम चुनाई', 'डंठल हटाना'] },
      { month: 'फरवरी', phase: 'none', activities: [] },
      { month: 'मार्च', phase: 'none', activities: [] },
      { month: 'अप्रैल', phase: 'none', activities: [] }
    ]
  },
  {
    id: 'sugarcane',
    name: 'गन्ना',
    months: [
      { month: 'जनवरी', phase: 'sowing', activities: ['भूमि की तैयारी', 'बीज (गन्ने के टुकड़े) उपचार', 'बुवाई (वसंत)'] },
      { month: 'फरवरी', phase: 'sowing', activities: ['बुवाई पूरी करना', 'पहली सिंचाई'] },
      { month: 'मार्च', phase: 'growing', activities: ['खरपतवार नियंत्रण', 'नाइट्रोजन की पहली टॉप ड्रेसिंग'] },
      { month: 'अप्रैल', phase: 'growing', activities: ['बार-बार सिंचाई', 'हल्की मिट्टी चढ़ाना'] },
      { month: 'मई', phase: 'growing', activities: ['दूसरी टॉप ड्रेसिंग', 'कीट निगरानी (बोरर)'] },
      { month: 'जून', phase: 'growing', activities: ['मुख्य रूप से मिट्टी चढ़ाना', 'गन्ने की बंधाई'] },
      { month: 'जुलाई', phase: 'growing', activities: ['जल निकासी प्रबंधन', 'रोग निगरानी'] },
      { month: 'अगस्त', phase: 'growing', activities: ['गिरने से बचाने के लिए गन्ने को सहारा देना'] },
      { month: 'सितंबर', phase: 'growing', activities: ['सिंचाई प्रबंधन'] },
      { month: 'अक्टूबर', phase: 'growing', activities: ['कटाई से पहले सिंचाई रोकें'] },
      { month: 'नवंबर', phase: 'harvesting', activities: ['अगेती किस्मों की कटाई', 'पेड़ी (Ratoon) प्रबंधन'] },
      { month: 'दिसंबर', phase: 'harvesting', activities: ['मुख्य कटाई', 'मिलों तक परिवहन'] }
    ]
  },
  {
    id: 'maize',
    name: 'मक्का (खरीफ)',
    months: [
      { month: 'जून', phase: 'sowing', activities: ['भूमि की तैयारी', 'बुनियादी उर्वरक का प्रयोग', 'बुवाई'] },
      { month: 'जुलाई', phase: 'growing', activities: ['विरलन (पौधे कम करना)', 'पहली टॉप ड्रेसिंग (घुटने की ऊंचाई पर)'] },
      { month: 'अगस्त', phase: 'growing', activities: ['मंजरी (Tasseling) की देखभाल', 'दूसरी टॉप ड्रेसिंग', 'कीट नियंत्रण (फॉल आर्मीवर्म)'] },
      { month: 'सितंबर', phase: 'harvesting', activities: ['भुट्टे की कटाई', 'सुखाना'] },
      { month: 'अक्टूबर', phase: 'none', activities: ['दाने निकालना और भंडारण'] },
      { month: 'नवंबर', phase: 'none', activities: [] },
      { month: 'दिसंबर', phase: 'none', activities: [] },
      { month: 'जनवरी', phase: 'none', activities: [] },
      { month: 'फरवरी', phase: 'none', activities: [] },
      { month: 'मार्च', phase: 'none', activities: [] },
      { month: 'अप्रैल', phase: 'none', activities: [] },
      { month: 'मई', phase: 'none', activities: ['गर्मियों की गहरी जुताई'] }
    ]
  },
  {
    id: 'soybean',
    name: 'सोयाबीन',
    months: [
      { month: 'जून', phase: 'sowing', activities: ['राइजोबियम कल्चर से बीज उपचार', 'मानसून की पहली बारिश के बाद बुवाई'] },
      { month: 'जुलाई', phase: 'growing', activities: ['निराई (बुवाई के 20-25 दिन बाद)', 'कीट निगरानी'] },
      { month: 'अगस्त', phase: 'growing', activities: ['फूल आने के चरण में देखभाल', 'आवश्यकतानुसार पर्णीय छिड़काव'] },
      { month: 'सितंबर', phase: 'growing', activities: ['फली बनना', 'रोग नियंत्रण (येलो मोज़ेक)'] },
      { month: 'अक्टूबर', phase: 'harvesting', activities: ['पत्तियां पीली होकर झड़ने पर कटाई', 'मड़ाई'] },
      { month: 'नवंबर', phase: 'none', activities: ['भंडारण'] },
      { month: 'दिसंबर', phase: 'none', activities: [] },
      { month: 'जनवरी', phase: 'none', activities: [] },
      { month: 'फरवरी', phase: 'none', activities: [] },
      { month: 'मार्च', phase: 'none', activities: [] },
      { month: 'अप्रैल', phase: 'none', activities: [] },
      { month: 'मई', phase: 'none', activities: ['भूमि की तैयारी'] }
    ]
  },
  {
    id: 'potato',
    name: 'आलू',
    months: [
      { month: 'सितंबर', phase: 'none', activities: ['बीज कंद (Tuber) की खरीद', 'कोल्ड स्टोरेज से निकालना'] },
      { month: 'अक्टूबर', phase: 'sowing', activities: ['भूमि की तैयारी', 'मेड़ बनाना', 'कंद की बुवाई'] },
      { month: 'नवंबर', phase: 'growing', activities: ['पहली सिंचाई', 'मिट्टी चढ़ाना', 'नाइट्रोजन टॉप ड्रेसिंग'] },
      { month: 'दिसंबर', phase: 'growing', activities: ['रोग निगरानी (पछेती झुलसा)', 'कवकनाशी का छिड़काव'] },
      { month: 'जनवरी', phase: 'growing', activities: ['पाले से बचाव', 'कटाई से 10-15 दिन पहले बेल काटना'] },
      { month: 'फरवरी', phase: 'harvesting', activities: ['कंदों की खुदाई', 'छाया में सुखाना (Curing)'] },
      { month: 'मार्च', phase: 'none', activities: ['ग्रेडिंग', 'कोल्ड स्टोरेज'] },
      { month: 'अप्रैल', phase: 'none', activities: [] },
      { month: 'मई', phase: 'none', activities: [] },
      { month: 'जून', phase: 'none', activities: [] },
      { month: 'जुलाई', phase: 'none', activities: [] },
      { month: 'अगस्त', phase: 'none', activities: [] }
    ]
  },
  {
    id: 'mustard',
    name: 'सरसों',
    months: [
      { month: 'सितंबर', phase: 'sowing', activities: ['बुवाई पूर्व सिंचाई', 'भूमि की तैयारी'] },
      { month: 'अक्टूबर', phase: 'sowing', activities: ['बुवाई', 'उर्वरकों की बुनियादी खुराक (सल्फर महत्वपूर्ण है)'] },
      { month: 'नवंबर', phase: 'growing', activities: ['पहली सिंचाई (35-40 दिन)', 'विरलन (Thinning)', 'खरपतवार नियंत्रण'] },
      { month: 'दिसंबर', phase: 'growing', activities: ['फूल आने का चरण', 'कीट निगरानी (माहू/एफिड्स)'] },
      { month: 'जनवरी', phase: 'growing', activities: ['फली बनना', 'दूसरी सिंचाई', 'पाले से बचाव'] },
      { month: 'फरवरी', phase: 'harvesting', activities: ['75% फलियां पीली होने पर कटाई'] },
      { month: 'मार्च', phase: 'none', activities: ['सुखाना', 'मड़ाई', 'भंडारण'] },
      { month: 'अप्रैल', phase: 'none', activities: [] },
      { month: 'मई', phase: 'none', activities: [] },
      { month: 'जून', phase: 'none', activities: [] },
      { month: 'जुलाई', phase: 'none', activities: [] },
      { month: 'अगस्त', phase: 'none', activities: [] }
    ]
  },
  {
    id: 'groundnut',
    name: 'मूंगफली (खरीफ)',
    months: [
      { month: 'जून', phase: 'sowing', activities: ['ट्राइकोडर्मा से बीज उपचार', 'मानसून के साथ बुवाई'] },
      { month: 'जुलाई', phase: 'growing', activities: ['निराई', 'जिप्सम का प्रयोग (फूल आने के समय)'] },
      { month: 'अगस्त', phase: 'growing', activities: ['पेगिंग चरण (मिट्टी को न छेड़ें)', 'कीट निगरानी (सफेद लट)'] },
      { month: 'सितंबर', phase: 'growing', activities: ['फली विकास', 'रोग नियंत्रण (टिक्का रोग)'] },
      { month: 'अक्टूबर', phase: 'harvesting', activities: ['बेलें पीली होने पर कटाई', 'फलियां तोड़ना'] },
      { month: 'नवंबर', phase: 'none', activities: ['फलियों को सुखाना', 'भंडारण'] },
      { month: 'दिसंबर', phase: 'none', activities: [] },
      { month: 'जनवरी', phase: 'none', activities: [] },
      { month: 'फरवरी', phase: 'none', activities: [] },
      { month: 'मार्च', phase: 'none', activities: [] },
      { month: 'अप्रैल', phase: 'none', activities: [] },
      { month: 'मई', phase: 'none', activities: ['गर्मियों की गहरी जुताई'] }
    ]
  },
  {
    id: 'bajra',
    name: 'बाजरा',
    months: [
      { month: 'जून', phase: 'sowing', activities: ['भूमि की तैयारी', 'पहली बारिश के साथ बुवाई'] },
      { month: 'जुलाई', phase: 'growing', activities: ['विरलन (Thinning)', 'खरपतवार प्रबंधन'] },
      { month: 'अगस्त', phase: 'growing', activities: ['टॉप ड्रेसिंग', 'रोग निगरानी'] },
      { month: 'सितंबर', phase: 'harvesting', activities: ['बालियों की कटाई'] },
      { month: 'अक्टूबर', phase: 'none', activities: ['सुखाना', 'मड़ाई'] },
      { month: 'नवंबर', phase: 'none', activities: [] },
      { month: 'दिसंबर', phase: 'none', activities: [] },
      { month: 'जनवरी', phase: 'none', activities: [] },
      { month: 'फरवरी', phase: 'none', activities: [] },
      { month: 'मार्च', phase: 'none', activities: [] },
      { month: 'अप्रैल', phase: 'none', activities: [] },
      { month: 'मई', phase: 'none', activities: ['गर्मियों की गहरी जुताई'] }
    ]
  },
  {
    id: 'jowar',
    name: 'ज्वार',
    months: [
      { month: 'जून', phase: 'sowing', activities: ['भूमि की तैयारी', 'बीज उपचार', 'बुवाई'] },
      { month: 'जुलाई', phase: 'growing', activities: ['खरपतवार नियंत्रण', 'निराई-गुड़ाई'] },
      { month: 'अगस्त', phase: 'growing', activities: ['नाइट्रोजन टॉप ड्रेसिंग', 'कीट निगरानी'] },
      { month: 'सितंबर', phase: 'growing', activities: ['फूल आने और दाना भरने के समय देखभाल'] },
      { month: 'अक्टूबर', phase: 'harvesting', activities: ['पकी हुई बालियों की कटाई'] },
      { month: 'नवंबर', phase: 'none', activities: ['सुखाना', 'भंडारण'] },
      { month: 'दिसंबर', phase: 'none', activities: [] },
      { month: 'जनवरी', phase: 'none', activities: [] },
      { month: 'फरवरी', phase: 'none', activities: [] },
      { month: 'मार्च', phase: 'none', activities: [] },
      { month: 'अप्रैल', phase: 'none', activities: [] },
      { month: 'मई', phase: 'none', activities: ['खेत की सफाई'] }
    ]
  },
  {
    id: 'tomato',
    name: 'टमाटर',
    months: [
      { month: 'जून', phase: 'sowing', activities: ['नर्सरी की तैयारी', 'नर्सरी में बीज बोना'] },
      { month: 'जुलाई', phase: 'sowing', activities: ['पौधरोपण', 'सहारा देना (Staking)'] },
      { month: 'अगस्त', phase: 'growing', activities: ['खरपतवार नियंत्रण', 'टॉप ड्रेसिंग', 'रोग निगरानी'] },
      { month: 'सितंबर', phase: 'growing', activities: ['सिंचाई', 'कीट प्रबंधन (फ्रूट बोरर)'] },
      { month: 'अक्टूबर', phase: 'harvesting', activities: ['पके फलों की पहली तुड़ाई'] },
      { month: 'नवंबर', phase: 'harvesting', activities: ['निरंतर तुड़ाई', 'ग्रेडिंग'] },
      { month: 'दिसंबर', phase: 'none', activities: ['पुराने पौधों को हटाना'] },
      { month: 'जनवरी', phase: 'none', activities: [] },
      { month: 'फरवरी', phase: 'none', activities: [] },
      { month: 'मार्च', phase: 'none', activities: [] },
      { month: 'अप्रैल', phase: 'none', activities: [] },
      { month: 'मई', phase: 'none', activities: ['मिट्टी का सौरीकरण (Solarization)'] }
    ]
  },
  {
    id: 'pulses',
    name: 'दलहन (मूंग/उड़द)',
    months: [
      { month: 'जून', phase: 'sowing', activities: ['राइजोबियम से बीज उपचार', 'बारिश के बाद बुवाई'] },
      { month: 'जुलाई', phase: 'growing', activities: ['पहली निराई', 'कीट निगरानी (सफेद मक्खी)'] },
      { month: 'अगस्त', phase: 'growing', activities: ['फूल आने का चरण', 'पर्णीय छिड़काव'] },
      { month: 'सितंबर', phase: 'harvesting', activities: ['फलियों की तुड़ाई', 'सुखाना'] },
      { month: 'अक्टूबर', phase: 'none', activities: ['मड़ाई', 'भंडारण'] },
      { month: 'नवंबर', phase: 'none', activities: [] },
      { month: 'दिसंबर', phase: 'none', activities: [] },
      { month: 'जनवरी', phase: 'none', activities: [] },
      { month: 'फरवरी', phase: 'none', activities: [] },
      { month: 'मार्च', phase: 'none', activities: [] },
      { month: 'अप्रैल', phase: 'none', activities: [] },
      { month: 'मई', phase: 'none', activities: ['गर्मियों की जुताई'] }
    ]
  },
  {
    id: 'sunflower',
    name: 'सूरजमुखी',
    months: [
      { month: 'जून', phase: 'sowing', activities: ['भूमि की तैयारी', 'बीज बुवाई'] },
      { month: 'जुलाई', phase: 'growing', activities: ['विरलन (Thinning)', 'निराई', 'पहली सिंचाई'] },
      { month: 'अगस्त', phase: 'growing', activities: ['फूल (Head) बनने का चरण', 'कीट निगरानी'] },
      { month: 'सितंबर', phase: 'harvesting', activities: ['पके हुए फूलों की कटाई'] },
      { month: 'अक्टूबर', phase: 'none', activities: ['सुखाना', 'बीज निकालना'] },
      { month: 'नवंबर', phase: 'none', activities: [] },
      { month: 'दिसंबर', phase: 'none', activities: [] },
      { month: 'जनवरी', phase: 'none', activities: [] },
      { month: 'फरवरी', phase: 'none', activities: [] },
      { month: 'मार्च', phase: 'none', activities: [] },
      { month: 'अप्रैल', phase: 'none', activities: [] },
      { month: 'मई', phase: 'none', activities: [] }
    ]
  },
  {
    id: 'castor',
    name: 'अरंडी',
    months: [
      { month: 'जुलाई', phase: 'sowing', activities: ['गहरी जुताई', 'बीज बुवाई'] },
      { month: 'अगस्त', phase: 'growing', activities: ['खरपतवार नियंत्रण', 'निराई-गुड़ाई'] },
      { month: 'सितंबर', phase: 'growing', activities: ['कीट निगरानी (सेमीलूपर)'] },
      { month: 'अक्टूबर', phase: 'growing', activities: ['स्पाइक (Spike) बनना', 'टॉप ड्रेसिंग'] },
      { month: 'नवंबर', phase: 'growing', activities: ['कैप्सूल विकास'] },
      { month: 'दिसंबर', phase: 'harvesting', activities: ['प्राथमिक स्पाइक्स की पहली तुड़ाई'] },
      { month: 'जनवरी', phase: 'harvesting', activities: ['दूसरी तुड़ाई'] },
      { month: 'फरवरी', phase: 'harvesting', activities: ['अंतिम तुड़ाई'] },
      { month: 'मार्च', phase: 'none', activities: ['मड़ाई', 'भंडारण'] },
      { month: 'अप्रैल', phase: 'none', activities: [] },
      { month: 'मई', phase: 'none', activities: [] },
      { month: 'जून', phase: 'none', activities: [] }
    ]
  },
  {
    id: 'ragi',
    name: 'रागी',
    months: [
      { month: 'जून', phase: 'sowing', activities: ['नर्सरी तैयार करना', 'खेत की तैयारी'] },
      { month: 'जुलाई', phase: 'sowing', activities: ['पौधरोपण'] },
      { month: 'अगस्त', phase: 'growing', activities: ['खरपतवार प्रबंधन', 'टॉप ड्रेसिंग'] },
      { month: 'सितंबर', phase: 'growing', activities: ['फूल आना और दाना भरना', 'रोग निगरानी'] },
      { month: 'अक्टूबर', phase: 'harvesting', activities: ['बालियों की कटाई'] },
      { month: 'नवंबर', phase: 'none', activities: ['सुखाना', 'मड़ाई', 'भंडारण'] },
      { month: 'दिसंबर', phase: 'none', activities: [] },
      { month: 'जनवरी', phase: 'none', activities: [] },
      { month: 'फरवरी', phase: 'none', activities: [] },
      { month: 'मार्च', phase: 'none', activities: [] },
      { month: 'अप्रैल', phase: 'none', activities: [] },
      { month: 'मई', phase: 'none', activities: ['गर्मियों की जुताई'] }
    ]
  },
  {
    id: 'jute',
    name: 'जूट',
    months: [
      { month: 'मार्च', phase: 'sowing', activities: ['बारीक बीज-शय्या की तैयारी', 'बीज बुवाई'] },
      { month: 'अप्रैल', phase: 'growing', activities: ['पहली निराई', 'विरलन (Thinning)'] },
      { month: 'मई', phase: 'growing', activities: ['दूसरी निराई', 'कीट निगरानी'] },
      { month: 'जून', phase: 'growing', activities: ['तेज वानस्पतिक विकास', 'नाइट्रोजन टॉप ड्रेसिंग'] },
      { month: 'जुलाई', phase: 'harvesting', activities: ['छोटे फली चरण पर कटाई'] },
      { month: 'अगस्त', phase: 'harvesting', activities: ['रेटिंग (पानी में भिगोकर गलाना)'] },
      { month: 'सितंबर', phase: 'none', activities: ['रेशा (Fibre) निकालना', 'धोना और सुखाना'] },
      { month: 'अक्टूबर', phase: 'none', activities: ['गांठें बनाना (Baling) और भंडारण'] },
      { month: 'नवंबर', phase: 'none', activities: [] },
      { month: 'दिसंबर', phase: 'none', activities: [] },
      { month: 'जनवरी', phase: 'none', activities: [] },
      { month: 'फरवरी', phase: 'none', activities: [] }
    ]
  }
];
