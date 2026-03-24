function App() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="text-center">
        <pre className="text-[var(--terminal-green)] text-sm mb-4">
          {`
  ____             ____    _    
 |  _ \\  _____   _|___ \\  / \\   
 | | | |/ _ \\ \\ / / __) |/ _ \\  
 | |_| |  __/\\ V / / __// ___ \\ 
 |____/ \\___| \\_/ |_____/_/   \\_\\
`}
        </pre>
        <p className="text-[var(--terminal-fg)]">Terminal Portfolio v0.1.0</p>
        <p className="text-[var(--terminal-comment)] mt-2">
          Type <span className="text-[var(--terminal-yellow)]">'help'</span> to
          get started
        </p>
      </div>
    </div>
  );
}

export default App;
