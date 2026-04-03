// Generated from: backlog\assets\PBI-005.feature
import { test } from "playwright-bdd";

test.describe('Application Shell – Foundation for Tactical Intelligence Dashboard', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('the SILENT SENTINEL application is loaded', null, { page }); 
    await And('the Marine theme is active', null, { page }); 
  });
  
  test('Application title is visible in the header', async ({ When, Then, And, page }) => { 
    await When('I view the application header', null, { page }); 
    await Then('the text "SILENT SENTINEL" is displayed prominently', null, { page }); 
    await And('the title uses a bold, headline font style', null, { page }); 
  });

  test('Top navigation displays all operational modules', async ({ When, Then, page }) => { 
    await When('I view the application header', null, { page }); 
    await Then('the navigation contains the module "OP_NEPTUNE"', null, { page }); 
  });

  test('Header navigation controls are present and accessible', async ({ When, Then, And, page }) => { 
    await When('I view the application header', null, { page }); 
    await Then('a <nav> element exists within the header', null, { page }); 
    await And('the navigation contains the module "OP_NEPTUNE"', null, { page }); 
  });

  test('Header applies glassmorphism visual effect', async ({ When, Then, And, page }) => { 
    await When('I view the application header', null, { page }); 
    await Then('the header has a semi-transparent dark background', null, { page }); 
    await And('the header applies a backdrop blur visual effect', null, { page }); 
  });

  test('Sidebar displays navigation items with icon and label pairs', async ({ When, Then, And, page }) => { 
    await When('I view the application sidebar', null, { page }); 
    await Then('the sidebar has a fixed width of 64 pixels', null, { page }); 
    await And('the sidebar contains an "IMINT" navigation item with an icon and label', null, { page }); 
    await And('the active sidebar item has a left border accent and subtle background', null, { page }); 
    await And('the sidebar applies a glassmorphism visual effect consistent with the header', null, { page }); 
  });

  test('Sidebar is hidden on small screens', async ({ Given, When, Then, page }) => { 
    await Given('the viewport width is 375 pixels', null, { page }); 
    await When('I view the application layout', null, { page }); 
    await Then('the sidebar is not visible', null, { page }); 
  });

  test('Three-section layout and OBJ_DETECTION panel are rendered', async ({ When, Then, And, page }) => { 
    await When('I view the application layout on a desktop viewport', null, { page }); 
    await Then('the layout has a left sidebar panel', null, { page }); 
    await And('the layout has a center main content area', null, { page }); 
    await And('a panel labelled "LEFT PANEL" with a live feed indicator is visible in the left panel', null, { page }); 
  });

  test('Panels use liquid glass design and grid background is visible', async ({ When, Then, And, page }) => { 
    await When('I view the main content area', null, { page }); 
    await Then('all panels apply a backdrop blur of 12 pixels', null, { page }); 
    await And('a subtle grid pattern with 24-pixel spacing is visible in the background', null, { page }); 
  });

  test('Design tokens for colors and typography are applied', async ({ When, Then, And, page }) => { 
    await When('I view the application shell', null, { page }); 
    await Then('the header background uses the Deep Navy color "#0F172A"', null, { page }); 
    await And('accent elements use the Signal Blue color "#3B82F6"', null, { page }); 
    await And('body text uses Source Sans 3 font', null, { page }); 
    await And('data labels use Source Code Pro font', null, { page }); 
  });

  test('Elements use square corners and tonal depth instead of borders', async ({ When, Then, And, page }) => { 
    await When('I inspect the visual style of application panels', null, { page }); 
    await Then('all panel elements have a border-radius of 0 pixels', null, { page }); 
    await And('depth is conveyed through color and tonal shifts rather than visible borders', null, { page }); 
  });

  test('Header remains visible on mobile screens', async ({ Given, When, Then, page }) => { 
    await Given('the viewport width is 375 pixels', null, { page }); 
    await When('I view the application layout', null, { page }); 
    await Then('the header is visible', null, { page }); 
  });

  test('Header elements meet WCAG AA contrast ratios', async ({ When, Then, page }) => { 
    await When('I inspect the rendered header with an accessibility checker', null, { page }); 
    await Then('no WCAG AA contrast violations are reported for header elements', null, { page }); 
  });

  test('Keyboard navigation is available through header elements', async ({ Given, When, Then, page }) => { 
    await Given('the application shell is focused', null, { page }); 
    await When('I press "Tab"', null, { page }); 
    await Then('focus cycles through keyboard-accessible header elements', null, { page }); 
  });

  test('Semantic HTML elements are used for accessibility', async ({ When, Then, And, page }) => { 
    await When('I inspect the DOM structure of the application shell', null, { page }); 
    await Then('a <header> element exists for the application header', null, { page }); 
    await And('a <nav> element exists within the header', null, { page }); 
    await And('an <aside> element exists for the sidebar', null, { page }); 
    await And('a <main> element exists for the main content area', null, { page }); 
    await And('a <footer> element exists for the status bar', null, { page }); 
  });

  test('Screen reader can access header structure', async ({ Given, When, Then, And, page }) => { 
    await Given('I am using a screen reader', null, { page }); 
    await When('I load the application', null, { page }); 
    await Then('the application title is announced', null, { page }); 
    await And('semantic landmark regions are announced appropriately', null, { page }); 
  });

  test('Header elements respond to hover', async ({ When, Then, page }) => { 
    await When('I hover over an interactive header element', null, { page }); 
    await Then('the element background changes to indicate hover state', null, { page }); 
  });

  test('Active navigation state uses the correct design token', async ({ When, Then, page }) => { 
    await When('I inspect the active navigation item style', null, { page }); 
    await Then('the active item color matches the primary_fixed_dim design token', null, { page }); 
  });

  test('Disabled elements are shown with reduced opacity', async ({ Given, When, Then, page }) => { 
    await Given('a navigation item is in a disabled state', null, { page }); 
    await When('I inspect the disabled element\'s visual style', null, { page }); 
    await Then('the element has an opacity of 60 percent', null, { page }); 
  });

  test('Focus states are visible for keyboard navigation', async ({ When, Then, And, page }) => { 
    await When('I navigate through header elements using keyboard', null, { page }); 
    await Then('a visible focus indicator is rendered on each element', null, { page }); 
    await And('the focus indicator uses the accent color or outline style', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('backlog\\assets\\PBI-005.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":14,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the SILENT SENTINEL application is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the Marine theme is active","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When I view the application header","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then the text \"SILENT SENTINEL\" is displayed prominently","stepMatchArguments":[{"group":{"start":9,"value":"\"SILENT SENTINEL\"","children":[{"start":10,"value":"SILENT SENTINEL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"And the title uses a bold, headline font style","stepMatchArguments":[]}]},
  {"pwTestLine":17,"pickleLine":23,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the SILENT SENTINEL application is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the Marine theme is active","isBg":true,"stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"When I view the application header","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then the navigation contains the module \"OP_NEPTUNE\"","stepMatchArguments":[{"group":{"start":35,"value":"\"OP_NEPTUNE\"","children":[{"start":36,"value":"OP_NEPTUNE","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":22,"pickleLine":31,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the SILENT SENTINEL application is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the Marine theme is active","isBg":true,"stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":32,"keywordType":"Action","textWithKeyword":"When I view the application header","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":33,"keywordType":"Outcome","textWithKeyword":"Then a <nav> element exists within the header","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"And the navigation contains the module \"OP_NEPTUNE\"","stepMatchArguments":[{"group":{"start":35,"value":"\"OP_NEPTUNE\"","children":[{"start":36,"value":"OP_NEPTUNE","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":28,"pickleLine":40,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the SILENT SENTINEL application is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the Marine theme is active","isBg":true,"stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":41,"keywordType":"Action","textWithKeyword":"When I view the application header","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":42,"keywordType":"Outcome","textWithKeyword":"Then the header has a semi-transparent dark background","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"And the header applies a backdrop blur visual effect","stepMatchArguments":[]}]},
  {"pwTestLine":34,"pickleLine":49,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the SILENT SENTINEL application is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the Marine theme is active","isBg":true,"stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":50,"keywordType":"Action","textWithKeyword":"When I view the application sidebar","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":51,"keywordType":"Outcome","textWithKeyword":"Then the sidebar has a fixed width of 64 pixels","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":52,"keywordType":"Outcome","textWithKeyword":"And the sidebar contains an \"IMINT\" navigation item with an icon and label","stepMatchArguments":[{"group":{"start":24,"value":"\"IMINT\"","children":[{"start":25,"value":"IMINT","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":38,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"And the active sidebar item has a left border accent and subtle background","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"And the sidebar applies a glassmorphism visual effect consistent with the header","stepMatchArguments":[]}]},
  {"pwTestLine":42,"pickleLine":60,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the SILENT SENTINEL application is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the Marine theme is active","isBg":true,"stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":61,"keywordType":"Context","textWithKeyword":"Given the viewport width is 375 pixels","stepMatchArguments":[{"group":{"start":22,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":44,"gherkinStepLine":62,"keywordType":"Action","textWithKeyword":"When I view the application layout","stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":63,"keywordType":"Outcome","textWithKeyword":"Then the sidebar is not visible","stepMatchArguments":[]}]},
  {"pwTestLine":48,"pickleLine":69,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the SILENT SENTINEL application is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the Marine theme is active","isBg":true,"stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":70,"keywordType":"Action","textWithKeyword":"When I view the application layout on a desktop viewport","stepMatchArguments":[]},{"pwStepLine":50,"gherkinStepLine":71,"keywordType":"Outcome","textWithKeyword":"Then the layout has a left sidebar panel","stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":72,"keywordType":"Outcome","textWithKeyword":"And the layout has a center main content area","stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":73,"keywordType":"Outcome","textWithKeyword":"And a panel labelled \"LEFT PANEL\" with a live feed indicator is visible in the left panel","stepMatchArguments":[{"group":{"start":17,"value":"\"LEFT PANEL\"","children":[{"start":18,"value":"LEFT PANEL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":55,"pickleLine":79,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the SILENT SENTINEL application is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the Marine theme is active","isBg":true,"stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":80,"keywordType":"Action","textWithKeyword":"When I view the main content area","stepMatchArguments":[]},{"pwStepLine":57,"gherkinStepLine":81,"keywordType":"Outcome","textWithKeyword":"Then all panels apply a backdrop blur of 12 pixels","stepMatchArguments":[]},{"pwStepLine":58,"gherkinStepLine":82,"keywordType":"Outcome","textWithKeyword":"And a subtle grid pattern with 24-pixel spacing is visible in the background","stepMatchArguments":[]}]},
  {"pwTestLine":61,"pickleLine":88,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the SILENT SENTINEL application is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the Marine theme is active","isBg":true,"stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":89,"keywordType":"Action","textWithKeyword":"When I view the application shell","stepMatchArguments":[]},{"pwStepLine":63,"gherkinStepLine":90,"keywordType":"Outcome","textWithKeyword":"Then the header background uses the Deep Navy color \"#0F172A\"","stepMatchArguments":[{"group":{"start":47,"value":"\"#0F172A\"","children":[{"start":48,"value":"#0F172A","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":64,"gherkinStepLine":91,"keywordType":"Outcome","textWithKeyword":"And accent elements use the Signal Blue color \"#3B82F6\"","stepMatchArguments":[{"group":{"start":42,"value":"\"#3B82F6\"","children":[{"start":43,"value":"#3B82F6","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":65,"gherkinStepLine":92,"keywordType":"Outcome","textWithKeyword":"And body text uses Source Sans 3 font","stepMatchArguments":[]},{"pwStepLine":66,"gherkinStepLine":93,"keywordType":"Outcome","textWithKeyword":"And data labels use Source Code Pro font","stepMatchArguments":[]}]},
  {"pwTestLine":69,"pickleLine":99,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the SILENT SENTINEL application is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the Marine theme is active","isBg":true,"stepMatchArguments":[]},{"pwStepLine":70,"gherkinStepLine":100,"keywordType":"Action","textWithKeyword":"When I inspect the visual style of application panels","stepMatchArguments":[]},{"pwStepLine":71,"gherkinStepLine":101,"keywordType":"Outcome","textWithKeyword":"Then all panel elements have a border-radius of 0 pixels","stepMatchArguments":[]},{"pwStepLine":72,"gherkinStepLine":102,"keywordType":"Outcome","textWithKeyword":"And depth is conveyed through color and tonal shifts rather than visible borders","stepMatchArguments":[]}]},
  {"pwTestLine":75,"pickleLine":108,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the SILENT SENTINEL application is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the Marine theme is active","isBg":true,"stepMatchArguments":[]},{"pwStepLine":76,"gherkinStepLine":109,"keywordType":"Context","textWithKeyword":"Given the viewport width is 375 pixels","stepMatchArguments":[{"group":{"start":22,"value":"375","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":77,"gherkinStepLine":110,"keywordType":"Action","textWithKeyword":"When I view the application layout","stepMatchArguments":[]},{"pwStepLine":78,"gherkinStepLine":111,"keywordType":"Outcome","textWithKeyword":"Then the header is visible","stepMatchArguments":[]}]},
  {"pwTestLine":81,"pickleLine":117,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the SILENT SENTINEL application is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the Marine theme is active","isBg":true,"stepMatchArguments":[]},{"pwStepLine":82,"gherkinStepLine":118,"keywordType":"Action","textWithKeyword":"When I inspect the rendered header with an accessibility checker","stepMatchArguments":[]},{"pwStepLine":83,"gherkinStepLine":119,"keywordType":"Outcome","textWithKeyword":"Then no WCAG AA contrast violations are reported for header elements","stepMatchArguments":[]}]},
  {"pwTestLine":86,"pickleLine":125,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the SILENT SENTINEL application is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the Marine theme is active","isBg":true,"stepMatchArguments":[]},{"pwStepLine":87,"gherkinStepLine":126,"keywordType":"Context","textWithKeyword":"Given the application shell is focused","stepMatchArguments":[]},{"pwStepLine":88,"gherkinStepLine":127,"keywordType":"Action","textWithKeyword":"When I press \"Tab\"","stepMatchArguments":[{"group":{"start":8,"value":"\"Tab\"","children":[{"start":9,"value":"Tab","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":89,"gherkinStepLine":128,"keywordType":"Outcome","textWithKeyword":"Then focus cycles through keyboard-accessible header elements","stepMatchArguments":[]}]},
  {"pwTestLine":92,"pickleLine":134,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the SILENT SENTINEL application is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the Marine theme is active","isBg":true,"stepMatchArguments":[]},{"pwStepLine":93,"gherkinStepLine":135,"keywordType":"Action","textWithKeyword":"When I inspect the DOM structure of the application shell","stepMatchArguments":[]},{"pwStepLine":94,"gherkinStepLine":136,"keywordType":"Outcome","textWithKeyword":"Then a <header> element exists for the application header","stepMatchArguments":[]},{"pwStepLine":95,"gherkinStepLine":137,"keywordType":"Outcome","textWithKeyword":"And a <nav> element exists within the header","stepMatchArguments":[]},{"pwStepLine":96,"gherkinStepLine":138,"keywordType":"Outcome","textWithKeyword":"And an <aside> element exists for the sidebar","stepMatchArguments":[]},{"pwStepLine":97,"gherkinStepLine":139,"keywordType":"Outcome","textWithKeyword":"And a <main> element exists for the main content area","stepMatchArguments":[]},{"pwStepLine":98,"gherkinStepLine":140,"keywordType":"Outcome","textWithKeyword":"And a <footer> element exists for the status bar","stepMatchArguments":[]}]},
  {"pwTestLine":101,"pickleLine":146,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the SILENT SENTINEL application is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the Marine theme is active","isBg":true,"stepMatchArguments":[]},{"pwStepLine":102,"gherkinStepLine":147,"keywordType":"Context","textWithKeyword":"Given I am using a screen reader","stepMatchArguments":[]},{"pwStepLine":103,"gherkinStepLine":148,"keywordType":"Action","textWithKeyword":"When I load the application","stepMatchArguments":[]},{"pwStepLine":104,"gherkinStepLine":149,"keywordType":"Outcome","textWithKeyword":"Then the application title is announced","stepMatchArguments":[]},{"pwStepLine":105,"gherkinStepLine":150,"keywordType":"Outcome","textWithKeyword":"And semantic landmark regions are announced appropriately","stepMatchArguments":[]}]},
  {"pwTestLine":108,"pickleLine":156,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the SILENT SENTINEL application is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the Marine theme is active","isBg":true,"stepMatchArguments":[]},{"pwStepLine":109,"gherkinStepLine":157,"keywordType":"Action","textWithKeyword":"When I hover over an interactive header element","stepMatchArguments":[]},{"pwStepLine":110,"gherkinStepLine":158,"keywordType":"Outcome","textWithKeyword":"Then the element background changes to indicate hover state","stepMatchArguments":[]}]},
  {"pwTestLine":113,"pickleLine":164,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the SILENT SENTINEL application is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the Marine theme is active","isBg":true,"stepMatchArguments":[]},{"pwStepLine":114,"gherkinStepLine":165,"keywordType":"Action","textWithKeyword":"When I inspect the active navigation item style","stepMatchArguments":[]},{"pwStepLine":115,"gherkinStepLine":166,"keywordType":"Outcome","textWithKeyword":"Then the active item color matches the primary_fixed_dim design token","stepMatchArguments":[]}]},
  {"pwTestLine":118,"pickleLine":172,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the SILENT SENTINEL application is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the Marine theme is active","isBg":true,"stepMatchArguments":[]},{"pwStepLine":119,"gherkinStepLine":173,"keywordType":"Context","textWithKeyword":"Given a navigation item is in a disabled state","stepMatchArguments":[]},{"pwStepLine":120,"gherkinStepLine":174,"keywordType":"Action","textWithKeyword":"When I inspect the disabled element's visual style","stepMatchArguments":[]},{"pwStepLine":121,"gherkinStepLine":175,"keywordType":"Outcome","textWithKeyword":"Then the element has an opacity of 60 percent","stepMatchArguments":[]}]},
  {"pwTestLine":124,"pickleLine":181,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the SILENT SENTINEL application is loaded","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And the Marine theme is active","isBg":true,"stepMatchArguments":[]},{"pwStepLine":125,"gherkinStepLine":182,"keywordType":"Action","textWithKeyword":"When I navigate through header elements using keyboard","stepMatchArguments":[]},{"pwStepLine":126,"gherkinStepLine":183,"keywordType":"Outcome","textWithKeyword":"Then a visible focus indicator is rendered on each element","stepMatchArguments":[]},{"pwStepLine":127,"gherkinStepLine":184,"keywordType":"Outcome","textWithKeyword":"And the focus indicator uses the accent color or outline style","stepMatchArguments":[]}]},
]; // bdd-data-end