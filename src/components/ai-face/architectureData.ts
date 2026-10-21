export type ArchitectureStage = { id: string; title: string; subtitle?: string; features: string[] }
export type ArchitectureBranch = { id: string; title: string; subtitle: string; stages: ArchitectureStage[] }

export const architectureBranches: ArchitectureBranch[] = [
  { id: 'styles', title: 'Styles', subtitle: 'Style Creation', stages: [
    { id: 'recommend', title: 'Discover Styles', features: ['Trending', 'Realism', 'Comic', 'More Categories', 'See All'] },
    { id: 'detail', title: 'Style Details', features: ['Style Preview', 'Sample Preview', 'Upload Photo', 'Take Photo'] },
    { id: 'material', title: 'Select Photo', features: [] },
    { id: 'parameters', title: 'Crop & Settings', features: ['Crop Ratio: 3:4 / 1:1 / 4:3', 'Similarity Settings', 'Create'] },
    { id: 'loading', title: 'Generating', features: ['Progress', 'Status Updates', 'Image Preview'] },
    { id: 'result', title: 'Result', features: ['Result Preview', 'Save', 'Share'] },
  ] },
  { id: 'brush', title: 'Brush', subtitle: 'Local Editing', stages: [
    { id: 'magic', title: 'Magic Brush', features: ['Feature Preview', 'Take Photo', 'Upload Photo', 'Try Demo'] },
    { id: 'material', title: 'Select Photo', features: ['Take Photo', 'Upload Photo', 'Try Demo'] },
    { id: 'crop', title: 'Crop Photo', features: ['Crop Size', 'Adjust Crop Area', 'Confirm Photo'] },
    { id: 'paint', title: 'Edit Mask', features: ['Brush', 'Eraser', 'Brush Size', 'Clear Mask', 'Undo', 'Confirm Mask'] },
    { id: 'prompt', title: 'Prompt Settings', subtitle: 'Describe your prompt', features: ['Enter Prompt', 'Choose Styles', 'Paint Mode', 'Create'] },
    { id: 'loading', title: 'Generating', features: ['Progress', 'Status Updates', 'Image Preview'] },
    { id: 'result', title: 'Result', features: ['Edit Again', 'Save', 'Share', 'Like', 'Dislike', 'Before / After'] },
  ] },
  { id: 'settings', title: 'Settings', subtitle: 'Preferences', stages: [
    { id: 'membership', title: 'Membership', features: ['Subscribed', 'Not Subscribed'] },
    { id: 'general', title: 'General Settings', features: ['Language Options', 'Like Our App', 'Tell Friends'] },
    { id: 'help', title: 'Help', features: ['Privacy Policy', 'Terms of Use', 'Feedback', 'About Us'] },
  ] },
]
