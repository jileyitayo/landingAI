import { ChatPanel } from "./components/chat-panel";
import { CustomizationPanel } from "./components/customization-panel";
import { PreviewPanel } from "./components/preview-panel";

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 h-screen bg-gray-50 dark:bg-gray-900">
      <div className="lg:col-span-1 h-full">
        <ChatPanel />
      </div>
      <div className="lg:col-span-1 h-full">
        <CustomizationPanel />
      </div>
      <div className="lg:col-span-1 h-full">
        <PreviewPanel />
      </div>
    </div>
  );
}
