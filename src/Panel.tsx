import React, { ReactElement, useEffect, useState } from 'react';
import { APP_COLLAPSE_WIDTH, APP_EXTEND_WIDTH, } from './const';
import Button from './components/Button';
import ChatBox from './components/ChatBox'

export default function Panel({ onWidthChange, initialEnabled }: { onWidthChange: (value: number) => void, initialEnabled: boolean }): ReactElement {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [sidePanelWidth, setSidePanelWidth] = useState(enabled ? APP_EXTEND_WIDTH : APP_COLLAPSE_WIDTH);

  function handleOnToggle(enabled: boolean) {
    const value = enabled ? APP_EXTEND_WIDTH : APP_COLLAPSE_WIDTH;
    setSidePanelWidth(value);
    onWidthChange(value);

    window['chrome'].storage?.local.set({ enabled });
  }

  function openPanel(force?: boolean) {
    const newValue = force || !enabled;
    setEnabled(newValue);
    handleOnToggle(newValue);
  }

  return (
    <div
      style={{
        width: sidePanelWidth,
        boxShadow: '0px 0px 5px #0000009e',
      }}
      className="absolute top-0 right-0 left-auto bottom-0 z-[99999] bg-[#F5F8FA] ease-in-out duration-300"
    >
      <div className="absolute top-0 right-0 left-auto bottom-0 w-full h-screen z-[99999] flex justify-center items-center p-0 overflow-hidden bg-[#F5F8FA]">
        <ChatBox></ChatBox>
      </div>
      <div className="absolute bottom-0 left-0 w-[30px] z-[99999] flex justify-center items-center p-1">
        <Button active={enabled} onClick={() => openPanel()}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-3 h-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  enabled
                    ? 'M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25'
                    : 'M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15'
                }
              />
            </svg>
          </span>
        </Button>
      </div>
    </div>
  );
}
