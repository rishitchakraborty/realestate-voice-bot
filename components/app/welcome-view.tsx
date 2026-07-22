/* eslint-disable */
import { Button } from '@/components/ui/button';

function WelcomeImage() {
  return (
    // <svg
    //   width="64"
    //   height="64"
    //   viewBox="0 0 64 64"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
    //   className="text-fg0 mb-4 size-16"
    // >
    //   <path
    //     d="M15 24V40C15 40.7957 14.6839 41.5587 14.1213 42.1213C13.5587 42.6839 12.7956 43 12 43C11.2044 43 10.4413 42.6839 9.87868 42.1213C9.31607 41.5587 9 40.7957 9 40V24C9 23.2044 9.31607 22.4413 9.87868 21.8787C10.4413 21.3161 11.2044 21 12 21C12.7956 21 13.5587 21.3161 14.1213 21.8787C14.6839 22.4413 15 23.2044 15 24ZM22 5C21.2044 5 20.4413 5.31607 19.8787 5.87868C19.3161 6.44129 19 7.20435 19 8V56C19 56.7957 19.3161 57.5587 19.8787 58.1213C20.4413 58.6839 21.2044 59 22 59C22.7956 59 23.5587 58.6839 24.1213 58.1213C24.6839 57.5587 25 56.7957 25 56V8C25 7.20435 24.6839 6.44129 24.1213 5.87868C23.5587 5.31607 22.7956 5 22 5ZM32 13C31.2044 13 30.4413 13.3161 29.8787 13.8787C29.3161 14.4413 29 15.2044 29 16V48C29 48.7957 29.3161 49.5587 29.8787 50.1213C30.4413 50.6839 31.2044 51 32 51C32.7956 51 33.5587 50.6839 34.1213 50.1213C34.6839 49.5587 35 48.7957 35 48V16C35 15.2044 34.6839 14.4413 34.1213 13.8787C33.5587 13.3161 32.7956 13 32 13ZM42 21C41.2043 21 40.4413 21.3161 39.8787 21.8787C39.3161 22.4413 39 23.2044 39 24V40C39 40.7957 39.3161 41.5587 39.8787 42.1213C40.4413 42.6839 41.2043 43 42 43C42.7957 43 43.5587 42.6839 44.1213 42.1213C44.6839 41.5587 45 40.7957 45 40V24C45 23.2044 44.6839 22.4413 44.1213 21.8787C43.5587 21.3161 42.7957 21 42 21ZM52 17C51.2043 17 50.4413 17.3161 49.8787 17.8787C49.3161 18.4413 49 19.2044 49 20V44C49 44.7957 49.3161 45.5587 49.8787 46.1213C50.4413 46.6839 51.2043 47 52 47C52.7957 47 53.5587 46.6839 54.1213 46.1213C54.6839 45.5587 55 44.7957 55 44V20C55 19.2044 54.6839 18.4413 54.1213 17.8787C53.5587 17.3161 52.7957 17 52 17Z"
    //     fill="currentColor"
    //   />
    // </svg>
    <img
      style={{ height: '6em', width: '13em', marginBottom: '1em' }}
      src="data:image/png;base64,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"
      alt="Quarkgen Logo"
      className="block size-6"
    />
  );
}

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
}

export const WelcomeView = ({
  startButtonText,
  onStartCall,
  ref,
}: React.ComponentProps<'div'> & WelcomeViewProps) => {
  return (
    <div ref={ref}>
      <section className="bg-background flex flex-col items-center justify-center text-center">
        <WelcomeImage />

        <p className="text-foreground max-w-prose pt-1 leading-6 font-medium">
          Chat with Realtime voice agents powered by Quarkgen's Voice AI over WebRTC.
        </p>

        <Button
          size="lg"
          onClick={onStartCall}
          className="mt-6 w-64 rounded-full font-mono text-xs font-bold tracking-wider uppercase"
        >
          {startButtonText}
        </Button>
      </section>

      {/* <div className="fixed bottom-5 left-0 flex w-full items-center justify-center">
        <p className="text-muted-foreground max-w-prose pt-1 text-xs leading-5 font-normal text-pretty md:text-sm">
          Need help getting set up? Check out the{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.livekit.io/agents/start/voice-ai/"
            className="underline"
          >
            Voice AI quickstart
          </a>
          .
        </p>
      </div> */}
    </div>
  );
};
