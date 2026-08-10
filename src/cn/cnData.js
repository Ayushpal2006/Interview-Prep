/* ======================================================================
   COMPUTER NETWORKS (CN) INTERVIEW PREPARATION DATASET
   Primary Source of Truth: Uploaded Computer Networking Notes PDF
   ====================================================================== */

export const GOOGLE_REQUEST_STEPS = [
  {
    step: 1,
    title: "1. Browser Cache Check",
    short: "Check Freshness",
    desc: "The browser checks if the requested URL content is fresh and present in the browser cache. If cached and valid, it displays the content immediately without network calls.",
    layer: "Application",
    badge: "Cache Check"
  },
  {
    step: 2,
    title: "2. DNS Lookup / OS Cache",
    short: "Domain to IP",
    desc: "If not cached, the browser checks OS DNS cache. If missing, it requests the OS to perform a DNS lookup using UDP to resolve 'google.com' into an IP address via DNS servers.",
    layer: "Application / UDP",
    badge: "UDP Query"
  },
  {
    step: 3,
    title: "3. IP Address Resolution",
    short: "Target IP Obtained",
    desc: "The DNS server resolves 'google.com' to its corresponding 32-bit IPv4 (or 128-bit IPv6) address (e.g., 142.250.190.46) and returns it to the client.",
    layer: "Network (IP)",
    badge: "IP Found"
  },
  {
    step: 4,
    title: "4. TCP 3-Way Handshake",
    short: "SYN -> SYN-ACK -> ACK",
    desc: "A new TCP connection is established between client and server via 3-way handshake: Client sends SYN, Server replies with SYN-ACK, Client responds with ACK.",
    layer: "Transport (TCP)",
    badge: "Handshake"
  },
  {
    step: 5,
    title: "5. HTTP / HTTPS Request",
    short: "GET / HTTP/1.1",
    desc: "The browser sends an HTTP GET request over the encrypted TCP connection (using TLS/SSL on Port 443 for HTTPS) asking for the webpage headers and content.",
    layer: "Application (Port 443/80)",
    badge: "HTTP GET"
  },
  {
    step: 6,
    title: "6. Web Server Processing",
    short: "Request Handling",
    desc: "Web servers (like NGINX/Apache) handle incoming HTTP requests, process backend logic/load balancers, and generate the HTTP response payload.",
    layer: "Server Side",
    badge: "Server Execution"
  },
  {
    step: 7,
    title: "7. HTTP Response Sent",
    short: "200 OK + Payload",
    desc: "The web server transmits an HTTP response status code (e.g. 200 OK) along with HTTP headers, HTML, CSS, JavaScript, and asset files back to client.",
    layer: "Application (HTTP)",
    badge: "HTTP 200"
  },
  {
    step: 8,
    title: "8. TCP Connection Management",
    short: "Keep-Alive / Close",
    desc: "The browser receives the data. Depending on Keep-Alive headers, the TCP connection is either reused for subsequent static assets or gracefully closed via 4-way FIN handshake.",
    layer: "Transport (TCP)",
    badge: "FIN / Reuse"
  },
  {
    step: 9,
    title: "9. Browser Decoding & Rendering",
    short: "DOM + CSSOM",
    desc: "The browser decodes the response, builds the DOM and CSSOM trees, executes JavaScript, and renders the visual webpage content on the screen.",
    layer: "Browser Rendering",
    badge: "Render Page"
  },
  {
    step: 10,
    title: "10. Asset Caching",
    short: "Cache Store",
    desc: "If response headers permit caching (Cache-Control/ETag), the browser stores response data locally in cache for faster future requests.",
    layer: "Client Storage",
    badge: "Cached"
  }
];

export const COMPARISONS = [
  {
    title: "TCP vs. UDP",
    colorL: "#4D96FF", // C.sky
    colorR: "#FF6B6B", // C.coral
    leftName: "TCP (Transmission Control Protocol)",
    rightName: "UDP (User Datagram Protocol)",
    rows: [
      { aspect: "Connection Type", left: "Connection-Oriented (Requires 3-way handshake)", right: "Connectionless (Sends packets directly)" },
      { aspect: "Speed & Overhead", left: "Comparatively Slower (Heavy headers & handshake)", right: "Much Faster & Lighter (Minimal header overhead)" },
      { aspect: "Reliability & Retransmission", left: "Reliable (Acknowledgments & Retransmission of lost data)", right: "Unreliable (No acknowledgments or retransmission)" },
      { aspect: "Error Checking", left: "Extensive (Flow control, congestion control, ACK)", right: "Basic error checking using Checksum" },
      { aspect: "Use Cases", left: "Web (HTTP/HTTPS), Email (SMTP), File Transfer (FTP)", right: "DNS queries, Video Streaming, Gaming, Voice (VoIP)" }
    ]
  },
  {
    title: "Hub vs. Switch",
    colorL: "#FFA94D", // C.amber
    colorR: "#3FC1A6", // C.mint
    leftName: "Hub",
    rightName: "Switch",
    rows: [
      { aspect: "OSI Layer", left: "Physical Layer (Layer 1)", right: "Data Link Layer (Layer 2)" },
      { aspect: "Data Transmission", left: "Broadcasts signal to ALL ports (except receiving port)", right: "Unicasts data to SPECIFIC target MAC port" },
      { aspect: "Packet Filtering", left: "No packet filtering available", right: "Packet filtering available using MAC address table" },
      { aspect: "Transmission Mode", left: "Half-Duplex (Collision domain shared across ports)", right: "Full-Duplex (Independent collision domain per port)" },
      { aspect: "Types", left: "Active Hub & Passive Hub", right: "Managed & Unmanaged Switches (Efficient Bridge)" }
    ]
  },
  {
    title: "MAC Address vs. IP Address",
    colorL: "#9B5DE5", // C.grape
    colorR: "#6BCB77", // C.leaf
    leftName: "MAC Address (Physical)",
    rightName: "IP Address (Logical)",
    rows: [
      { aspect: "Definition", left: "Physical address uniquely identifying NIC hardware", right: "Logical address identifying network connection" },
      { aspect: "Provider", left: "Burned in by NIC Card Manufacturer", right: "Assigned dynamically/statically by ISP / DHCP" },
      { aspect: "Address Length", left: "48-bit (6 octets, e.g. 00:1A:2B:3C:4D:5E)", right: "32-bit (IPv4, 4 octets) or 128-bit (IPv6)" },
      { aspect: "Scope", left: "Used for local network delivery (Data Link layer)", right: "Used for end-to-end internet routing (Network layer)" },
      { aspect: "Resolution Protocol", left: "ARP converts IP to MAC address", right: "DNS converts Domain to IP address" }
    ]
  },
  {
    title: "Router vs. Gateway",
    colorL: "#38C6D9", // C.cyan
    colorR: "#FFC93C", // C.sun
    leftName: "Router",
    rightName: "Gateway",
    rows: [
      { aspect: "Primary Function", left: "Forwards data packets between SIMILAR networks", right: "Converts data & connects DISSIMILAR networks" },
      { aspect: "Protocol Translation", left: "Does not translate higher-level protocols", right: "Translates protocols across differing network architectures" },
      { aspect: "OSI Layer", left: "Network Layer (Layer 3)", right: "Transport through Application Layers (Layers 4 - 7)" },
      { aspect: "Traffic Regulation", left: "Regulates traffic based on IP routing tables", right: "Regulates traffic & acts as protocol converter entry point" }
    ]
  },
  {
    title: "OSI Model (7 Layers) vs. TCP/IP Model (4 Layers)",
    colorL: "#FF8FB1", // C.pink
    colorR: "#4D96FF", // C.sky
    leftName: "OSI Model (7 Layers)",
    rightName: "TCP/IP Model (4 Layers)",
    rows: [
      { aspect: "Origin & Architecture", left: "Theoretical ISO standard with 7 distinct layers", right: "Practical DoD model (1960s) with 4 compressed layers" },
      { aspect: "Layer Structure", left: "Application, Presentation, Session, Transport, Network, Data Link, Physical", right: "Application, Transport, Internet, Link" },
      { aspect: "Top Layers Mapping", left: "Application, Presentation, Session exist as 3 separate layers", right: "Combined into a single Application Layer" },
      { aspect: "Bottom Layers Mapping", left: "Data Link and Physical exist as 2 separate layers", right: "Combined into a single Link Layer" }
    ]
  }
];

export const TOPICS = [
  {
    id: "google-request-flow",
    title: "1. What Happens When You Enter google.com? (Most Important)",
    importance: "HIGH FREQUENCY",
    category: "Scenario",
    difficulty: "Hard",
    concept: "Detailed end-to-end breakdown of how a web browser processes a domain request, performs DNS lookup, establishes TCP handshake, exchanges HTTP data, renders HTML, and caches assets.",
    keyPoints: [
      "1. Browser checks internal cache -> OS cache -> requests DNS lookup over UDP.",
      "2. DNS server resolves 'google.com' to 32-bit IP address.",
      "3. TCP 3-Way Handshake (SYN -> SYN-ACK -> ACK) establishes connection.",
      "4. HTTP/HTTPS request sent over TCP connection (Port 443).",
      "5. Web Server processes request and sends HTTP 200 response with payload.",
      "6. Browser decodes HTML/CSS/JS, renders DOM, and caches cacheable responses."
    ],
    code: `// Conceptual Flow Signature
Browser -> Cache -> DNS (UDP) -> IP Resolution -> TCP Handshake -> HTTP GET -> Server Processing -> HTTP Response -> Render & Cache`,
    interviewQuestion: "What happens from the moment you type 'google.com' in a browser until the page renders?",
    goodAnswer: "The browser checks local cache. If un-cached, it asks the OS to do a DNS lookup over UDP to resolve 'google.com' into an IP address. Next, a TCP 3-way handshake (SYN, SYN-ACK, ACK) establishes a connection. An HTTP GET request is sent to port 80/443. The web server processes the request and sends back an HTTP response payload. The browser decodes HTML/CSS/JS to render the webpage and stores cacheable assets.",
    followUp: "What happens if DNS resolution fails during this process?",
    trap: "Forgetting to mention the TCP 3-way handshake or confusing DNS UDP lookup with HTTP TCP connection."
  },
  {
    id: "network-fundamentals",
    title: "2. Network Fundamentals, Nodes & Links",
    importance: "IMPORTANT",
    category: "Definition",
    difficulty: "Easy",
    concept: "A computer network is an interconnected setup of two or more devices communicating via physical transmission media. Connected devices are called Nodes; physical connection media are called Links.",
    keyPoints: [
      "Node = Connected computer, printer, or peripheral device.",
      "Link = Physical medium of connection (Coaxial cable, Optical Fiber, Wireless).",
      "Network Criteria: Performance (transmit & response time), Reliability, Robustness, Security.",
      "Reliability Factors: Downtime (recovery time), Failure Frequency, Catastrophe (fire, earthquake)."
    ],
    code: `Node A (PC) <==== Physical Link (Fiber/Ethernet) ====> Node B (Server)`,
    interviewQuestion: "What is the difference between a Node and a Link, and how is network effectiveness measured?",
    goodAnswer: "A Node is any device connected to a network (such as a computer or router). A Link is the physical communication channel (like fiber optics or Ethernet cable) connecting nodes. Network effectiveness is measured by Performance (transit/response time), Reliability (low failure frequency), Robustness, and Security.",
    followUp: "How does catastrophe differ from standard failure frequency?",
    trap: "Confusing physical links with logical sockets or transport ports."
  },
  {
    id: "topologies",
    title: "3. The 6 Network Topologies",
    importance: "HIGH FREQUENCY",
    category: "Conceptual",
    difficulty: "Medium",
    concept: "Network topology specifies the geometric layout of nodes and cabling in a network. Divided into Star, Ring, Bus, Mesh, Tree, and Hybrid topologies.",
    keyPoints: [
      "1. Star: All nodes connect to central device (Switch/Hub). Robust cable failure isolation, but central device failure downs network.",
      "2. Ring: Nodes connected sequentially in a continuous circular loop. Single node damage breaks whole ring.",
      "3. Bus: All nodes share a central backbone cable. Useful for small setups; backbone break downs whole network.",
      "4. Mesh: Nodes individually connected to other nodes (Full mesh = N(N-1)/2 links). Highly robust, high cabling cost.",
      "5. Tree: Combination of Star networks connected to a central Bus (expanded star). Uses Ethernet protocol.",
      "6. Hybrid: Combination of two or more distinct topology types."
    ],
    code: `// Mesh Links Formula
Total Links in Full Mesh = (N * (N - 1)) / 2`,
    interviewQuestion: "Which network topology is most robust against single cable failures and why?",
    goodAnswer: "Mesh topology is the most robust because every node has dedicated point-to-point links to other nodes. A single cable failure only disconnects that specific line without impacting the rest of the network. Star topology also isolates cable failures to single nodes unless the central hub/switch fails.",
    followUp: "How many links are required for a fully connected Mesh topology with 10 nodes?",
    trap: "Assuming connecting two Star networks together creates a Hybrid topology—connecting two identical topologies remains a Star topology."
  },
  {
    id: "network-types-vpn",
    title: "4. Network Types & VPN Architectures",
    importance: "IMPORTANT",
    category: "Conceptual",
    difficulty: "Medium",
    concept: "Networks are classified by geographical distribution (PAN, LAN, HAN, CAN, MAN, WAN, GAN). A Virtual Private Network (VPN) builds a secure encrypted tunnel across the public internet.",
    keyPoints: [
      "PAN (Personal Area Network): Range up to 10 meters for personal devices.",
      "LAN (Local Area Network): Small location (office, hospital, school). HAN = Home LAN.",
      "CAN (Campus Area Network): Links departments within a university/corporate campus.",
      "MAN (Metropolitan Area Network): Spans large cities; WAN (Wide Area Network): Spans countries.",
      "GAN (Global Area Network): Uses satellites for global connectivity.",
      "VPN Types: Access VPN (remote telecommuters), Site-to-Site VPN (branch offices), Intranet VPN (private company WAN), Extranet VPN (suppliers/partners)."
    ],
    code: `Client Device === [Encrypted VPN Tunnel over Public Internet] ===> Corporate Private WAN`,
    interviewQuestion: "What is a VPN, what are its major advantages, and how does Access VPN differ from Site-to-Site VPN?",
    goodAnswer: "A VPN creates a secure encrypted tunnel across public internet infrastructure. It disguises IP identity, encrypts traffic, and provides low-cost secure remote access. Access VPN connects individual remote mobile users to a company network. Site-to-Site VPN connects entire branch office networks to a main office network.",
    followUp: "What is the difference between Intranet VPN and Extranet VPN?",
    trap: "Confusing WAN with VPN—WAN is a broad geographical network; VPN is a virtual secure overlay built ON TOP of the internet."
  },
  {
    id: "ipv4-addressing-classes",
    title: "5. IPv4 32-Bit Addressing & Classes",
    importance: "HIGH FREQUENCY",
    category: "Definition",
    difficulty: "Medium",
    concept: "IPv4 uses a 32-bit dynamic address split into 4 octets (8 bits each, values 0-255). IPv4 classes (A, B, C, D, E) are differentiated by the first octet.",
    keyPoints: [
      "32-bit dynamic address divided into 4 octets separated by dots (e.g. 192.168.1.1).",
      "Class A: 1.0.0.0 to 126.255.255.255 (First octet 1-126). Large networks.",
      "Class B: 128.0.0.0 to 191.255.255.255 (First octet 128-191). Medium networks.",
      "Class C: 192.0.0.0 to 223.255.255.255 (First octet 192-223). Small networks.",
      "Class D: 224.0.0.0 to 239.255.255.255 (Multicasting). Class E: 240.0.0.0 to 255.255.255.255 (Experimental).",
      "Note: 127.0.0.1 is reserved for Loopback testing."
    ],
    code: `IPv4 Format: [Octet 1].[Octet 2].[Octet 3].[Octet 4]
Example:    192.168.1.100 (Class C, 32 bits total)`,
    interviewQuestion: "Explain the structure of an IPv4 address and how classes A, B, and C are identified.",
    goodAnswer: "IPv4 is a 32-bit address represented as 4 decimal octets (0-255). Classes are identified by the first octet value: Class A (1-126) for large networks, Class B (128-191) for medium networks, and Class C (192-223) for small networks. Class D is for Multicasting, and Class E is for Experimental use.",
    followUp: "Why is 127.x.x.x not included in Class A or Class B usable host ranges?",
    trap: "Forgetting that 127.0.0.0/8 is reserved strictly for loopback testing."
  },
  {
    id: "osi-model-7-layers",
    title: "6. The OSI Model (7 Layers Deep Dive)",
    importance: "HIGH FREQUENCY",
    category: "Conceptual",
    difficulty: "Hard",
    concept: "Open Systems Interconnection (OSI) is an ISO standardized 7-layer architectural framework defining network communication from physical transmission up to user applications.",
    keyPoints: [
      "Layer 7 - Application: Enables user network access (HTTP, HTTPS, FTP, SMTP, DNS).",
      "Layer 6 - Presentation: Translation, data conversion, compression, encryption/decryption.",
      "Layer 5 - Session: Begins, maintains, and terminates user sessions & error reporting.",
      "Layer 4 - Transport: End-to-end message delivery, segmentation, flow control, error checking (TCP, UDP).",
      "Layer 3 - Network: Logical addressing (IP), packetizing, routing, fragmentation (IP, ICMP, ARP).",
      "Layer 2 - Data Link: Frames creation, physical MAC addressing, flow control, error-free node delivery.",
      "Layer 1 - Physical: Unstructured raw bit stream transmission over physical medium (Cables, Hubs)."
    ],
    code: `OSI Stack Memory Mnemonic: "All People Seem To Need Data Processing"
[7: App] -> [6: Pres] -> [5: Sess] -> [4: Trans] -> [3: Net] -> [2: DataLink] -> [1: Phys]`,
    interviewQuestion: "Walk through the 7 layers of the OSI model and state the primary function of each layer.",
    goodAnswer: "The 7 OSI layers are: 1) Physical (transmits raw bits), 2) Data Link (framing & MAC physical addressing), 3) Network (IP logical addressing & routing), 4) Transport (end-to-end segmentation, TCP/UDP), 5) Session (establishes/terminates sessions), 6) Presentation (data translation, encryption, compression), and 7) Application (user network services like HTTP/FTP).",
    followUp: "At which layer do Routers operate versus Switches?",
    trap: "Confusing Presentation layer responsibilities (encryption/compression) with Application layer protocols."
  },
  {
    id: "tcp-ip-model-vs-osi",
    title: "7. TCP/IP Model vs. OSI Model",
    importance: "HIGH FREQUENCY",
    category: "Difference",
    difficulty: "Medium",
    concept: "The TCP/IP model is a practical 4-layer architecture developed by DoD in the 1860s/1970s. It compresses OSI's 7 layers into Link, Internet, Transport, and Application layers.",
    keyPoints: [
      "Link Layer: Equivalent to OSI Physical + Data Link layers (Ethernet, Sonet).",
      "Internet Layer: Equivalent to OSI Network layer (IP, ICMP). Holds architecture together.",
      "Transport Layer: Equivalent to OSI Transport layer (TCP, UDP).",
      "Application Layer: Combines OSI Session + Presentation + Application layers (HTTP, SMTP, DNS)."
    ],
    code: `TCP/IP (4 Layers)    <==== Mapping ====>    OSI (7 Layers)
1. Application                             Application, Presentation, Session
2. Transport                               Transport
3. Internet                                Network
4. Link                                    Data Link, Physical`,
    interviewQuestion: "Compare the TCP/IP model with the OSI model.",
    goodAnswer: "The OSI model is a theoretical 7-layer framework by ISO. The TCP/IP model is a practical 4-layer framework used by the internet. TCP/IP compresses OSI's top three layers (Session, Presentation, Application) into a single Application layer, and OSI's bottom two layers (Data Link, Physical) into a single Link layer.",
    followUp: "Why did TCP/IP become the dominant commercial standard over OSI?",
    trap: "Thinking TCP/IP has 5 layers in its original DoD definition—the original DoD standard defines exactly 4 layers."
  },
  {
    id: "http-vs-https",
    title: "8. HTTP vs. HTTPS",
    importance: "HIGH FREQUENCY",
    category: "Difference",
    difficulty: "Medium",
    concept: "HTTP (HyperText Transfer Protocol) is an unencrypted stateless application protocol over TCP Port 80. HTTPS adds SSL/TLS encryption over TCP Port 443 for secure transactions.",
    keyPoints: [
      "HTTP: Unencrypted, stateless protocol operating on Port 80 by default.",
      "HTTPS: Secure HTTP using SSL/TLS encryption layer on Port 443 by default.",
      "HTTPS provides 3 protections: Encryption (privacy), Data Integrity, and Server Authentication.",
      "Stateless: Each command executes independently without remembering previous requests."
    ],
    code: `HTTP:  Client === [Cleartext Data on Port 80] ===> Server
HTTPS: Client === [SSL/TLS Encrypted Tunnel on Port 443] ===> Server`,
    interviewQuestion: "What is the main difference between HTTP and HTTPS, and why is HTTP called a 'stateless' protocol?",
    goodAnswer: "HTTP transmits plain text over TCP Port 80 with no security. HTTPS encrypts communication using SSL/TLS protocols over Port 443, ensuring confidentiality, data integrity, and server authentication. HTTP is called stateless because each request-response cycle is independent; the server does not retain client state across requests.",
    followUp: "How do modern web apps maintain user login sessions over a stateless HTTP protocol?",
    trap: "Confusing TCP connection state with HTTP application protocol statelessness."
  },
  {
    id: "dns-and-dns-forwarder",
    title: "9. DNS & DNS Forwarders",
    importance: "HIGH FREQUENCY",
    category: "Why/How",
    difficulty: "Medium",
    concept: "DNS (Domain Name System, introduced 1983) is an internet naming directory mapping human-readable domain names to numerical IP addresses. A DNS Forwarder delegates unresolvable queries to external DNS servers.",
    keyPoints: [
      "Maps domain names (www.google.com) to IP addresses (142.250.190.46).",
      "Without DNS, users would have to memorize numerical IP addresses.",
      "Uses UDP by default for fast lightweight queries (Port 53).",
      "DNS Forwarder: A DNS server configured to forward unresolved queries to external DNS servers."
    ],
    code: `Client -> Local DNS Server -> [Unresolved] -> DNS Forwarder -> External DNS (8.8.8.8) -> IP Resolved`,
    interviewQuestion: "What is DNS, why is it necessary, and what is the role of a DNS Forwarder?",
    goodAnswer: "DNS is a distributed directory mapping domain names to IP addresses so users don't have to memorize IP numbers. When a local DNS server receives a query it cannot resolve from its local zone or cache, a DNS Forwarder intercepts and forwards that query to designated external DNS servers (like ISP or Google 8.8.8.8) for resolution.",
    followUp: "Why does DNS use UDP for standard queries but TCP for zone transfers?",
    trap: "Assuming DNS only uses TCP—DNS queries primarily use UDP for speed."
  },
  {
    id: "smtp-protocol",
    title: "10. SMTP Protocol",
    importance: "IMPORTANT",
    category: "Definition",
    difficulty: "Easy",
    concept: "SMTP (Simple Mail Transfer Protocol) is an application layer protocol for transmitting emails between servers across the internet. Operates on TCP Port 25 in an always-listening mode.",
    keyPoints: [
      "Application layer protocol used for email transmission between mail servers.",
      "Operates on TCP Port 25 in always-listening mode.",
      "Supports both End-to-End and Store-and-Forward transmission methods.",
      "Used for SENDING emails (POP3/IMAP used for RECEIVING/fetching emails)."
    ],
    code: `Mail Client === [SMTP Port 25] ===> Mail Server A === [SMTP Port 25] ===> Mail Server B`,
    interviewQuestion: "What is SMTP and how does it differ from POP3?",
    goodAnswer: "SMTP (Port 25) is a protocol used by mail servers to push/send emails across the internet using End-to-End or Store-and-Forward models. POP3 (Port 110) is a client-side retrieval protocol used to pull/download received emails from a mail server.",
    followUp: "What are the two delivery modes supported by SMTP?",
    trap: "Claiming SMTP is used by email clients to fetch emails from an inbox (that is POP3/IMAP)."
  },
  {
    id: "tcp-vs-udp-deepdive",
    title: "11. TCP vs. UDP Deep Dive",
    importance: "HIGH FREQUENCY",
    category: "Difference",
    difficulty: "Hard",
    concept: "TCP provides connection-oriented, reliable, ordered byte-stream delivery with flow control and retransmission. UDP provides connectionless, lightweight, unordered datagram delivery with minimal overhead.",
    keyPoints: [
      "TCP: Connection-oriented (3-way handshake), reliable, guarantees ordering, flow control, heavier headers (20 bytes).",
      "UDP: Connectionless (no handshake), unreliable, no ordering guarantees, basic checksum, lightweight headers (8 bytes).",
      "TCP speed is slower due to ACK & retransmission overhead.",
      "UDP is faster and ideal for real-time applications (Voice, Video, Online Gaming, DNS)."
    ],
    code: `TCP Packet Header: 20 Bytes (Sequence No, Ack No, Window Size, Flags)
UDP Packet Header: 8 Bytes  (Source Port, Dest Port, Length, Checksum)`,
    interviewQuestion: "Why would you choose UDP over TCP if TCP is reliable?",
    goodAnswer: "UDP is chosen when low latency and high speed are more critical than 100% packet delivery. In real-time applications like video streaming, VoIP, or multiplayer gaming, losing an occasional frame is acceptable, but waiting for TCP retransmission causes unacceptable lag. UDP also avoids 3-way handshake overhead.",
    followUp: "How does TCP handle flow control and congestion control?",
    trap: "Stating UDP has no error checking—UDP includes a basic 16-bit Checksum field."
  },
  {
    id: "important-protocols",
    title: "12. Core Network Protocols (DHCP, FTP, ICMP, ARP, RIP)",
    importance: "HIGH FREQUENCY",
    category: "Conceptual",
    difficulty: "Medium",
    concept: "Key network protocols managing IP auto-configuration, file transfer, network error reporting, address resolution, and dynamic routing.",
    keyPoints: [
      "DHCP (Port 67): Auto-assigns IP addresses, subnet masks, default gateways, and DNS servers to devices.",
      "FTP (Port 27): Application layer protocol for transferring files reliably between hosts.",
      "ICMP (Port 7): Network layer protocol used by routers/devices for error handling and diagnostics (Ping).",
      "ARP: Network layer protocol translating logical IP addresses to physical MAC addresses on local networks.",
      "RIP: Routing Information Protocol using hop count distance vector algorithm for best route calculation."
    ],
    code: `ARP Request:  "Who has IP 192.168.1.5? Tell 192.168.1.1" (Broadcast)
ARP Response: "192.168.1.5 is at MAC 00:1A:2B:3C:4D:5E" (Unicast)`,
    interviewQuestion: "What is ARP and how does it resolve an IP address to a MAC address?",
    goodAnswer: "ARP (Address Resolution Protocol) maps a 32-bit logical IP address to a 48-bit physical MAC address on a local network. When a device wants to send data to a local IP, it broadcasts an ARP request. The device holding that IP responds with a unicast ARP reply containing its MAC address, which is cached in the ARP table.",
    followUp: "What is ARP Spoofing and how does it compromise security?",
    trap: "Confusing ARP (IP -> MAC) with RARP/DHCP (MAC -> IP)."
  },
  {
    id: "mac-vs-ip-addressing",
    title: "13. MAC Address vs. IP Address",
    importance: "HIGH FREQUENCY",
    category: "Difference",
    difficulty: "Medium",
    concept: "A MAC Address is a 48-bit permanent physical address assigned by NIC manufacturers. An IP Address is a 32-bit (or 128-bit) logical address assigned dynamically by network administrators/ISPs.",
    keyPoints: [
      "MAC Address: 48-bit (6 hex octets, e.g. 00:1A:2B:3C:4D:5E), assigned by NIC manufacturer, Data Link layer.",
      "IP Address: 32-bit IPv4 or 128-bit IPv6, assigned by ISP/DHCP, Network layer.",
      "MAC address identifies the physical hardware node; IP address identifies the network location.",
      "Data Link layer switches forward using MAC addresses; Network layer routers forward using IP addresses."
    ],
    code: `MAC: 00-1B-44-11-3A-B7 (48 bits / 6 Octets)
IP:  192.168.1.1       (32 bits / 4 Octets)`,
    interviewQuestion: "Why do we need BOTH a MAC address and an IP address?",
    goodAnswer: "IP addresses provide logical hierarchical routing across global networks so routers can direct traffic across different subnets. MAC addresses provide flat physical identification to deliver frames directly between adjacent hardware nodes on the local physical network.",
    followUp: "Does your MAC address change when you move from your home Wi-Fi to a coffee shop Wi-Fi?",
    trap: "Believing a device's MAC address changes when switching Wi-Fi networks (the MAC address is burned into the NIC hardware)."
  },
  {
    id: "ipconfig-vs-ifconfig",
    title: "14. ipconfig vs. ifconfig",
    importance: "IMPORTANT",
    category: "Troubleshooting",
    difficulty: "Easy",
    concept: "Command-line utilities used across operating systems to view, configure, and troubleshoot network interface settings.",
    keyPoints: [
      "ipconfig: Command-line utility in Microsoft Windows OS to display IP, subnet mask, default gateway, and flush DNS.",
      "ifconfig: Command-line utility in UNIX, Linux, and macOS to configure and query network interfaces.",
      "Used for inspecting active IP assignments, MAC addresses, and renewing DHCP leases."
    ],
    code: `Windows: > ipconfig /all   (or ipconfig /flushdns)
macOS/Linux: $ ifconfig   (or ip addr)`,
    interviewQuestion: "Differentiate between ipconfig and ifconfig commands.",
    goodAnswer: "Both are CLI network diagnostics tools used to view and configure network interface settings. `ipconfig` is used exclusively in Microsoft Windows operating systems, whereas `ifconfig` (or modern `ip`) is used in Unix, Linux, and macOS systems.",
    followUp: "What command flushes the DNS resolver cache in Windows vs macOS?",
    trap: "Attempting to run `ifconfig` in Windows Command Prompt without WSL."
  },
  {
    id: "firewalls",
    title: "15. Firewalls & Security Policies",
    importance: "HIGH FREQUENCY",
    category: "Conceptual",
    difficulty: "Medium",
    concept: "A Firewall is a network security system that monitors and filters incoming and outgoing traffic based on predetermined security rules, creating a barrier between public and private networks.",
    keyPoints: [
      "Acts as a barrier between untrusted public internet and private trusted networks.",
      "Monitors incoming and outgoing traffic based on firewall security policies.",
      "Can be Hardware appliances, Software programs, or a combination of both.",
      "Filters traffic based on IP addresses, port numbers, protocols, or packet state."
    ],
    code: `Internet (Public) <== [FIREWALL RULE: Block Port 23, Allow Port 443] ==> Private LAN`,
    interviewQuestion: "What is a Firewall and how does it protect a private network?",
    goodAnswer: "A firewall is a network security system (hardware or software) that inspects incoming and outgoing network traffic against defined security policies. It blocks unauthorized packets, prevents malware/port scans, and shields private network devices from public internet threats.",
    followUp: "What is the difference between a Stateless Firewall and a Stateful Firewall?",
    trap: "Assuming firewalls only exist as software software applications on PCs—enterprise firewalls are dedicated physical hardware appliances."
  },
  {
    id: "hub-vs-switch",
    title: "16. Hub vs. Switch",
    importance: "HIGH FREQUENCY",
    category: "Difference",
    difficulty: "Medium",
    concept: "A Hub is a Layer 1 Physical device that broadcasts received signals to all ports. A Switch is a Layer 2 Data Link device that filters and unicasts frames to target MAC ports in full-duplex mode.",
    keyPoints: [
      "Hub: Layer 1 (Physical layer). Broadcasts data to all connected ports (except source). Shared collision domain.",
      "Switch: Layer 2 (Data Link layer). Unicasts data using MAC address table. Independent collision domain per port.",
      "Switch supports Full-Duplex transmission mode (simultaneous send and receive).",
      "Switch is also referred to as an efficient multi-port bridge."
    ],
    code: `Hub:    Incoming Packet on Port 1 ===> Broadcasted to Ports 2, 3, 4 (High Collisions)
Switch: Incoming Packet on Port 1 ===> Unicasted ONLY to Port 3 via MAC Table (No Collisions)`,
    interviewQuestion: "Why is a Switch preferred over a Hub in modern computer networks?",
    goodAnswer: "A Hub operates at Layer 1 and blindly broadcasts every packet to all ports, creating a single shared collision domain and causing heavy network congestion. A Switch operates at Layer 2, inspects destination MAC addresses, and forwards data only to the specific destination port in full-duplex mode, eliminating collisions and maximizing bandwidth.",
    followUp: "What happens when a Switch receives a frame with an unknown destination MAC address?",
    trap: "Confusing Layer 2 Switches with Layer 3 Routers."
  },
  {
    id: "subnetting",
    title: "17. Subnetting & Subnets",
    importance: "HIGH FREQUENCY",
    category: "Why/How",
    difficulty: "Hard",
    concept: "Subnetting is the practice of logically dividing a single physical IP network into smaller sub-networks (subnets) using subnet masks.",
    keyPoints: [
      "Subnet = A logical sub-network inside a larger IP network.",
      "Improves routing efficiency by reducing routing table lookup times.",
      "Enhances network security by isolating broadcast domains and network segments.",
      "Uses Subnet Masks (e.g. 255.255.255.0 /24) to separate Network ID from Host ID."
    ],
    code: `IP Address:  192.168.1.50
Subnet Mask: 255.255.255.0 (/24)
Network ID:  192.168.1.0 | Host ID: 50`,
    interviewQuestion: "What is subnetting and what core benefits does it provide?",
    goodAnswer: "Subnetting divides a larger IP network into smaller sub-networks using a subnet mask. Key benefits: 1) Improves network performance by scoping broadcast traffic, 2) Enhances security by isolating sensitive departments, 3) Maximizes IPv4 address allocation efficiency, and 4) Simplifies router table lookups.",
    followUp: "How many usable hosts are available in a /24 subnet?",
    trap: "Forgetting that 2 addresses in every subnet are reserved (Network ID and Broadcast ID)."
  },
  {
    id: "router-vs-gateway",
    title: "18. Router vs. Gateway",
    importance: "HIGH FREQUENCY",
    category: "Difference",
    difficulty: "Medium",
    concept: "A Router routes data packets between SIMILAR networks using IP addresses (Layer 3). A Gateway connects and translates data between DISSIMILAR networks with different protocols.",
    keyPoints: [
      "Router: Layer 3 device forwarding IP packets between networks with similar protocols.",
      "Gateway: Joins two or more DISSIMILAR networks (translating different higher-level protocol stacks).",
      "Both regulate traffic and determine optimal routing paths across networks.",
      "In home setups, a single physical device acts as both Router and Default Gateway to the ISP."
    ],
    code: `Router:  Connects LAN A (IP) <====> LAN B (IP)  (Similar Protocols)
Gateway: Connects Corporate IP Network <====> SNA / Legacy Protocol Network (Dissimilar Protocols)`,
    interviewQuestion: "What is the key difference between a Router and a Gateway?",
    goodAnswer: "A Router operates at Layer 3 to forward data packets between similar networks using common IP routing protocols. A Gateway connects and translates data between completely dissimilar networks that run different protocol suites (such as converting IP traffic to a proprietary legacy protocol).",
    followUp: "What is a Default Gateway in a local PC's TCP/IP configuration?",
    trap: "Using the terms Router and Gateway interchangeably without acknowledging protocol translation."
  },
  {
    id: "nic-card",
    title: "19. Network Interface Card (NIC)",
    importance: "IMPORTANT",
    category: "Definition",
    difficulty: "Easy",
    concept: "A Network Interface Card (NIC) is a hardware expansion card or onboard chip providing a computer with a physical and wireless interface to connect to a LAN network.",
    keyPoints: [
      "Peripheral hardware card or motherboard chip connecting PC to a network.",
      "Contains a unique 48-bit MAC address burned into its ROM by manufacturer.",
      "Operates at both Physical Layer (Layer 1) and Data Link Layer (Layer 2).",
      "Supports Ethernet cable jacks (RJ-45) or wireless radio antennas (Wi-Fi)."
    ],
    code: `PC Motherboard ===> NIC Card (MAC: 00:1A:2B:3C:4D:5E) ===> RJ-45 Ethernet Cable / Wi-Fi`,
    interviewQuestion: "What is an NIC card and what essential identifier does it contain?",
    goodAnswer: "An NIC (Network Interface Card) is a hardware component that allows a computer to connect to a network. It contains a unique 48-bit MAC (Media Access Control) address hardcoded by the manufacturer, which uniquely identifies the computer on the local network at the Data Link layer.",
    followUp: "At which OSI layers does an NIC operate?",
    trap: "Assuming NIC cards only operate at the Physical layer (they handle framing and MAC addresses at Data Link layer as well)."
  },
  {
    id: "pop3-protocol",
    title: "20. POP3 Protocol & Modes",
    importance: "IMPORTANT",
    category: "Definition",
    difficulty: "Easy",
    concept: "POP3 (Post Office Protocol version 3) is a client-side mail retrieval protocol operating on TCP Port 110. Supports Delete mode and Keep mode.",
    keyPoints: [
      "Application layer protocol used by email clients to fetch emails from a remote mail server.",
      "Operates on TCP Port 110 by default.",
      "Delete Mode: Deletes email from server inbox after downloading to local client.",
      "Keep Mode: Retains a copy of the email on the mail server after downloading."
    ],
    code: `Email Client === [POP3 Port 110 Download Query] ===> Remote Mail Server Inbox`,
    interviewQuestion: "What is POP3 and what are its two operating modes?",
    goodAnswer: "POP3 (Post Office Protocol v3, Port 110) is an application protocol used to retrieve emails from a server to a local client. It supports two modes: Delete Mode (which deletes the email from the server once downloaded) and Keep Mode (which keeps a copy on the server for access from other devices).",
    followUp: "How does POP3 differ from IMAP?",
    trap: "Confusing POP3 (email retrieval) with SMTP (email sending)."
  },
  {
    id: "private-vs-public-ip",
    title: "21. Private IP vs. Public IP Address",
    importance: "HIGH FREQUENCY",
    category: "Difference",
    difficulty: "Medium",
    concept: "Private IP addresses are reserved non-routable addresses used within local networks. Public IP addresses are globally unique addresses assigned by ISPs for internet communication.",
    keyPoints: [
      "Private IP Ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. Reserved for internal LANs.",
      "Private IPs cannot route directly on the public internet; require NAT (Network Address Translation).",
      "Public IPs: Globally unique IP addresses assigned by ISP for public internet routing.",
      "NAT / Proxy servers translate multiple private LAN IPs into a single public IP."
    ],
    code: `Private IPs: 10.x.x.x, 172.16-31.x.x, 192.168.x.x (Non-routable on Internet)
Public IP:  142.250.190.46 (Globally Routable)`,
    interviewQuestion: "What is the difference between a Private IP and a Public IP, and how do private IPs access the internet?",
    goodAnswer: "Private IPs belong to three reserved ranges (10.x, 172.16-31.x, 192.168.x) used strictly inside local private networks and are not routable on the public internet. Public IPs are globally unique addresses provided by ISPs. Devices with private IPs access the internet through NAT (Network Address Translation) on a router.",
    followUp: "Why were private IP address ranges created?",
    trap: "Trying to directly ping a private IP address (like 192.168.1.1) from an external public internet connection."
  },
  {
    id: "raid-storage",
    title: "22. RAID (Redundant Array of Independent Disks)",
    importance: "IMPORTANT",
    category: "Definition",
    difficulty: "Medium",
    concept: "RAID is a data storage virtualization technology that combines multiple physical hard disk drives into a single logical unit to provide fault tolerance and performance enhancement.",
    keyPoints: [
      "RAID = Redundant Array of Independent (or Inexpensive) Disks.",
      "Provides Fault Tolerance by distributing data across multiple physical disk drives.",
      "RAID 0 (Striping): High performance, zero fault tolerance.",
      "RAID 1 (Mirroring): Full data redundancy by duplicating data onto 2 drives.",
      "RAID 5 (Striping with Parity): High fault tolerance and efficient storage utilization."
    ],
    code: `RAID 1 (Mirroring): Disk 1 [Data A] === Duplicate ===> Disk 2 [Data A]`,
    interviewQuestion: "What is RAID and why is it used in server infrastructure?",
    goodAnswer: "RAID (Redundant Array of Independent Disks) combines multiple physical hard drives into a single logical unit. It is used in server infrastructure to provide fault tolerance (preventing data loss if a hard drive fails) and to increase read/write performance through disk striping.",
    followUp: "What is the difference between RAID 0 and RAID 1?",
    trap: "Assuming RAID 0 provides backup/fault tolerance—RAID 0 offers NO redundancy."
  },
  {
    id: "netstat-command",
    title: "23. netstat Command Utility",
    importance: "IMPORTANT",
    category: "Troubleshooting",
    difficulty: "Easy",
    concept: "`netstat` (Network Statistics) is a command-line utility program that provides detailed information about active TCP/IP connections, listening ports, and routing tables.",
    keyPoints: [
      "Command-line utility available across Windows, Linux, and macOS.",
      "Displays active TCP connections, listening ports, and protocol statistics.",
      "Helps detect unauthorized listening ports, malware connections, and network bottlenecks.",
      "Common command: `netstat -ano` (Windows) or `netstat -tuln` (Linux)."
    ],
    code: `> netstat -ano
Proto  Local Address          Foreign Address        State text           PID
TCP    127.0.0.1:5173         0.0.0.0:0              LISTENING       14820`,
    interviewQuestion: "What is the `netstat` command used for in network troubleshooting?",
    goodAnswer: "`netstat` (Network Statistics) is a CLI utility used to view all active TCP/UDP connections, listening ports, routing tables, and interface statistics. It is invaluable for diagnosing network connection failures, identifying socket leaks, and checking which process PID is bound to a port.",
    followUp: "What command argument displays open listening ports with process IDs in Windows?",
    trap: "Confusing `netstat` (connection statistics) with `nslookup` (DNS query tool)."
  },
  {
    id: "ping-command",
    title: "24. ping Command Utility & ICMP",
    importance: "HIGH FREQUENCY",
    category: "Troubleshooting",
    difficulty: "Easy",
    concept: "`ping` is a network administration utility used to test the reachability of a host on an IP network and measure round-trip time using ICMP Echo Request/Reply packets.",
    keyPoints: [
      "Tests reachability of a target host using IP address or domain name.",
      "Uses ICMP (Internet Control Message Protocol) Echo Request and Echo Reply messages.",
      "Measures round-trip time (RTT) in milliseconds and packet loss percentage.",
      "Syntax: `ping 8.8.8.8` or `ping google.com`."
    ],
    code: `> ping google.com
PING google.com (142.250.190.46): 56 data bytes
64 bytes from 142.250.190.46: icmp_seq=0 ttl=117 time=14.2 ms`,
    interviewQuestion: "How does the `ping` command work under the hood and what protocol does it use?",
    goodAnswer: "The `ping` command tests network reachability between source and destination devices. Under the hood, it uses ICMP (Internet Control Message Protocol). The source sends an ICMP Echo Request packet to the target IP; if reachable, the target responds with an ICMP Echo Reply, allowing `ping` to calculate round-trip latency.",
    followUp: "Why might a host fail to respond to `ping` even if it is online and working?",
    trap: "Assuming `ping` uses TCP or UDP—`ping` operates directly on top of IP using ICMP."
  },
  {
    id: "peer-to-peer-processes",
    title: "25. Peer-to-Peer (P2P) Processes",
    importance: "IMPORTANT",
    category: "Definition",
    difficulty: "Easy",
    concept: "Peer-to-peer processes refer to communication between matching entities operating at the exact same OSI layer on separate network machines.",
    keyPoints: [
      "Processes on different machines communicating at a given identical layer.",
      "Each layer on sending machine communicates logically with its peer layer on receiving machine.",
      "Encapsulation wraps data down layers on sender side; decapsulation unwraps data up layers on receiver side.",
      "Virtual communication occurs horizontally between peer layers; physical transmission occurs vertically."
    ],
    code: `Sender Machine (Transport Layer) === Logical P2P Communication ===> Receiver Machine (Transport Layer)`,
    interviewQuestion: "What are peer-to-peer processes in OSI reference architecture?",
    goodAnswer: "In the OSI model, peer-to-peer processes are the protocol entities operating at the exact same layer on different machines that communicate logically with each other (e.g. Transport layer to Transport layer). Data moves vertically down the sender's stack, across the physical medium, and back up the receiver's stack.",
    followUp: "How does encapsulation enable peer-to-peer logical communication?",
    trap: "Confusing OSI peer-to-peer layer processes with P2P file-sharing software (like BitTorrent)."
  },
  {
    id: "casting-modes",
    title: "26. Transmission Modes: Unicast, Anycast, Multicast, Broadcast",
    importance: "HIGH FREQUENCY",
    category: "Conceptual",
    difficulty: "Medium",
    concept: "The four primary methods for delivering network data from a source node to destination nodes across a network.",
    keyPoints: [
      "1. Unicast: 1-to-1 transmission from a single source to a single specific destination node.",
      "2. Anycast: 1-to-1-of-many transmission where data is delivered to the nearest node among a group (CDNs).",
      "3. Multicast: 1-to-many-subset transmission delivering data to a specific group of subscribed nodes.",
      "4. Broadcast: 1-to-all transmission delivering data to every node on the local network (DHCP, ARP)."
    ],
    code: `Unicast:   Source -> Node A (Single target)
Anycast:   Source -> Nearest Node in Server Group (CDN)
Multicast: Source -> Nodes A, B (Subscribed group)
Broadcast: Source -> ALL Nodes on Network (255.255.255.255)`,
    interviewQuestion: "Differentiate between Unicast, Anycast, Multicast, and Broadcast modes.",
    goodAnswer: "Unicast sends data 1-to-1 to a single target node. Anycast sends data 1-to-1-of-many to the geographically nearest node in a server cluster (used by CDNs/DNS). Multicast sends data 1-to-many to a selective subscribed group of nodes. Broadcast sends data 1-to-all to every node on the local network.",
    followUp: "Why is broadcasting prohibited across the public internet?",
    trap: "Confusing Multicast (selective group) with Broadcast (every device on subnet)."
  }
];

export const QUICK_REVISION = [
  { term: "Node & Link", summary: "Node = connected device; Link = physical medium (fiber/ethernet)." },
  { term: "6 Topologies", summary: "Star (central switch), Ring (circle loop), Bus (backbone cable), Mesh (N(N-1)/2 links), Tree (star+bus), Hybrid." },
  { term: "Network Types", summary: "PAN (10m), LAN (office), HAN (home), CAN (campus), MAN (city), WAN (country), GAN (satellite)." },
  { term: "VPN Types", summary: "Access (mobile users), Site-to-Site (branches), Intranet (private WAN), Extranet (suppliers)." },
  { term: "IPv4 Address", summary: "32-bit dynamic address, 4 octets (0-255). Classes A, B, C, D (multicast), E (experimental)." },
  { term: "OSI 7 Layers", summary: "Physical, Data Link, Network, Transport, Session, Presentation, Application." },
  { term: "TCP/IP 4 Layers", summary: "Link, Internet, Transport, Application (developed by DoD 1860s/1970s)." },
  { term: "HTTP vs HTTPS", summary: "HTTP (Port 80 cleartext) vs HTTPS (Port 443 SSL/TLS encrypted)." },
  { term: "DNS", summary: "Domain Name System (Paul Mockapetris & Jon Postel 1983). Maps domain to IP using UDP." },
  { term: "DNS Forwarder", summary: "Forwards unresolvable local DNS queries to external DNS servers." },
  { term: "SMTP", summary: "Simple Mail Transfer Protocol (Port 25). Pushes/sends email between servers." },
  { term: "TCP vs UDP", summary: "TCP = connection-oriented, reliable, 3-way handshake. UDP = connectionless, fast, lightweight." },
  { term: "DHCP", summary: "Dynamic Host Config Protocol (Port 67). Auto-assigns IP, subnet, gateway, DNS." },
  { term: "FTP", summary: "File Transfer Protocol (Port 27). Reliable file transfer between hosts." },
  { term: "ICMP", summary: "Internet Control Message Protocol (Port 7). Network error handling & diagnostics (Ping)." },
  { term: "ARP", summary: "Address Resolution Protocol. Translates logical IP address to physical MAC address." },
  { term: "RIP", summary: "Routing Information Protocol. Distance-vector dynamic routing using hop counts." },
  { term: "MAC vs IP", summary: "MAC = 48-bit physical hardware address. IP = 32-bit logical network address." },
  { term: "ipconfig vs ifconfig", summary: "ipconfig = Windows command; ifconfig = Linux/macOS/UNIX command." },
  { term: "Firewall", summary: "Security barrier monitoring/blocking traffic based on rules between public & private networks." },
  { term: "Hub vs Switch", summary: "Hub = Layer 1 broadcast to all ports. Switch = Layer 2 unicast using MAC table." },
  { term: "Subnetting", summary: "Dividing a network into subnets for higher routing efficiency and security." },
  { term: "Network Reliability", summary: "Measured by Downtime (recovery time), Failure Frequency, Catastrophe." },
  { term: "Network Effectiveness", summary: "Measured by Performance, Reliability, Robustness, Security." },
  { term: "Router vs Gateway", summary: "Router = forwards data between SIMILAR networks; Gateway = connects DISSIMILAR networks." },
  { term: "NIC Card", summary: "Network Interface Card containing unique 48-bit MAC address for network connection." },
  { term: "POP3", summary: "Post Office Protocol v3 (Port 110). Fetches emails in Delete or Keep modes." },
  { term: "Private vs Public IP", summary: "Private (10.x, 172.16-31.x, 192.168.x) requires NAT; Public is internet routable." },
  { term: "RAID", summary: "Redundant Array of Independent Disks. Multiple HDDs providing fault tolerance." },
  { term: "netstat", summary: "CLI program displaying active TCP/IP connections and listening ports." },
  { term: "ping", summary: "CLI utility testing host reachability and round-trip latency using ICMP Echo." },
  { term: "Peer-to-Peer Processes", summary: "Logical communication between matching entities at the same OSI layer." },
  { term: "Unicast", summary: "1-to-1 delivery to a single specific node." },
  { term: "Anycast", summary: "1-to-1-of-many delivery to the nearest node in a group (CDNs)." },
  { term: "Multicast", summary: "1-to-many delivery to a subscribed subset of nodes." },
  { term: "Broadcast", summary: "1-to-all delivery to every node on the local network (255.255.255.255)." }
];

export const RAPID_FIRE = [
  { q: "What port does HTTP use by default?", a: "Port 80" },
  { q: "What port does HTTPS use by default?", a: "Port 443" },
  { q: "Which protocol resolves IP addresses to MAC addresses?", a: "ARP (Address Resolution Protocol)" },
  { q: "At which OSI layer does a Switch operate?", a: "Layer 2 (Data Link Layer)" },
  { q: "At which OSI layer does a Router operate?", a: "Layer 3 (Network Layer)" },
  { q: "Is TCP connectionless or connection-oriented?", a: "Connection-Oriented (3-Way Handshake)" },
  { q: "Is UDP reliable or unreliable?", a: "Unreliable (No ACK or retransmission)" },
  { q: "What is the loopback IP address?", a: "127.0.0.1" },
  { q: "How many bits are in an IPv4 address?", a: "32 bits (4 octets)" },
  { q: "How many bits are in a MAC address?", a: "48 bits (6 octets)" },
  { q: "Which protocol auto-assigns IP addresses to devices?", a: "DHCP (Port 67)" },
  { q: "Which command flushes DNS cache in Windows?", a: "ipconfig /flushdns" },
  { q: "What does POP3 stand for?", a: "Post Office Protocol version 3" },
  { q: "What transmission mode sends packets to ALL nodes on a subnet?", a: "Broadcast" },
  { q: "What is the full form of RAID?", a: "Redundant Array of Independent (or Inexpensive) Disks" }
];

export const QUESTION_BANK = [
  {
    id: "q1",
    question: "What happens when you enter 'google.com' in a web browser?",
    difficulty: "Hard",
    category: "Scenario",
    answer: "Browser checks cache -> OS asks DNS server via UDP to resolve IP -> TCP 3-way handshake established on Port 443 -> HTTP GET request sent -> Web server handles request & sends HTTP 200 response -> Browser decodes HTML/CSS/JS to render page & cache assets.",
    followUp: "What happens during the TCP 3-way handshake?"
  },
  {
    id: "q2",
    question: "Why is a switch preferred over a hub in modern networks?",
    difficulty: "Medium",
    category: "Difference",
    answer: "A Hub operates at Layer 1 and broadcasts packets to all ports, causing high collisions. A Switch operates at Layer 2, uses a MAC address table to unicast frames only to the target port in full-duplex mode, eliminating collisions.",
    followUp: "What happens when a Switch receives a frame with an unknown MAC address?"
  },
  {
    id: "q3",
    question: "What is the difference between TCP and UDP?",
    difficulty: "Medium",
    category: "Difference",
    answer: "TCP is connection-oriented, reliable, orders packets, and uses acknowledgments & flow control. UDP is connectionless, lightweight, faster, but does not guarantee delivery or packet ordering.",
    followUp: "Why does DNS use UDP for queries but TCP for zone transfers?"
  },
  {
    id: "q4",
    question: "Differentiate between an IP address and a MAC address.",
    difficulty: "Medium",
    category: "Difference",
    answer: "An IP address is a 32-bit (or 128-bit) logical network address assigned dynamically by ISP/DHCP for global routing. A MAC address is a 48-bit physical hardware address burned into the NIC for local Data Link delivery.",
    followUp: "How does ARP connect IP addressing to MAC addressing?"
  },
  {
    id: "q5",
    question: "What is the difference between a Router and a Gateway?",
    difficulty: "Hard",
    category: "Difference",
    answer: "A Router operates at Layer 3 to forward IP packets between SIMILAR networks. A Gateway connects and translates data between DISSIMILAR networks running completely different protocol suites.",
    followUp: "What is a Default Gateway in local network configuration?"
  },
  {
    id: "q6",
    question: "Walk through the 7 layers of the OSI model.",
    difficulty: "Hard",
    category: "Conceptual",
    answer: "Physical (raw bits), Data Link (framing/MAC), Network (IP/routing), Transport (TCP/UDP segmentation), Session (session control), Presentation (translation/encryption), Application (user services HTTP/DNS).",
    followUp: "How does the TCP/IP 4-layer model map to the OSI 7-layer model?"
  },
  {
    id: "q7",
    question: "Why is subnetting used in IP networking?",
    difficulty: "Hard",
    category: "Why/How",
    answer: "Subnetting divides a larger network into smaller sub-networks using subnet masks. It increases routing efficiency, limits broadcast domains, enhances security, and prevents IPv4 address exhaustion.",
    followUp: "How many usable host IP addresses exist in a /24 subnet?"
  },
  {
    id: "q8",
    question: "What is the role of ARP and how does ARP spoofing work?",
    difficulty: "Medium",
    category: "Troubleshooting",
    answer: "ARP resolves a logical IP address to a physical MAC address by broadcasting an ARP request on the local LAN. ARP spoofing occurs when an attacker sends fake ARP replies, linking their MAC address to a legitimate IP to intercept traffic.",
    followUp: "How can ARP spoofing be prevented on a switch?"
  },
  {
    id: "q9",
    question: "Why are private IP addresses non-routable on the public internet?",
    difficulty: "Medium",
    category: "Conceptual",
    answer: "Private IP ranges (10.x, 172.16-31.x, 192.168.x) are reused across millions of private LANs globally. Because they are not unique worldwide, public internet routers drop private IP packets. NAT translates private IPs to a public IP.",
    followUp: "How does NAT track multiple internal devices using a single public IP address?"
  },
  {
    id: "q10",
    question: "Compare Unicast, Anycast, Multicast, and Broadcast delivery modes.",
    difficulty: "Medium",
    category: "Conceptual",
    answer: "Unicast is 1-to-1 target delivery. Anycast is 1-to-nearest target delivery in a server cluster (CDNs). Multicast is 1-to-selective subscribed group. Broadcast is 1-to-all devices on the local subnet.",
    followUp: "Which protocols rely on Broadcast transmission to function on a local LAN?"
  }
];
