import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Download, Github, BookOpen, Play, Copy, ExternalLink, Star, Users, Calendar } from "lucide-react"

// Force dynamic rendering to prevent prerendering issues with Client Components
export const dynamic = 'force-dynamic'

export default function SDKsPage() {
  const sdks = [
    {
      name: "Python",
      version: "1.2.0",
      description: "Official Python SDK with async support and type hints",
      downloads: "45.2K",
      stars: "1.2K",
      lastUpdated: "2 days ago",
      icon: "🐍",
      color: "bg-blue-500",
      features: ["Async support", "Type hints", "Full API coverage", "Examples included"],
      requirements: "Python 3.8+",
      installCommand: "pip install Modelsnest",
      documentation: "/docs/python",
      github: "https://github.com/Modelsnest/Modelsnest-python"
    },
    {
      name: "JavaScript",
      version: "2.1.0",
      description: "Modern JavaScript/TypeScript SDK for Node.js and browsers",
      downloads: "67.8K",
      stars: "2.1K",
      lastUpdated: "1 week ago",
      icon: "🟨",
      color: "bg-yellow-500",
      features: ["TypeScript support", "Browser compatible", "Streaming support", "Tree-shaking"],
      requirements: "Node.js 16+",
      installCommand: "npm install Modelsnest",
      documentation: "/docs/javascript",
      github: "https://github.com/Modelsnest/Modelsnest-js"
    },
    {
      name: "Java",
      version: "1.0.5",
      description: "Enterprise-grade Java SDK with Spring Boot integration",
      downloads: "23.4K",
      stars: "856",
      lastUpdated: "3 weeks ago",
      icon: "☕",
      color: "bg-orange-500",
      features: ["Spring Boot support", "Reactive streams", "Comprehensive tests", "Maven/Gradle"],
      requirements: "Java 11+",
      installCommand: "mvn install Modelsnest-java",
      documentation: "/docs/java",
      github: "https://github.com/Modelsnest/Modelsnest-java"
    },
    {
      name: "C#",
      version: "1.1.2",
      description: ".NET SDK with full async/await support and dependency injection",
      downloads: "18.9K",
      stars: "623",
      lastUpdated: "1 month ago",
      icon: "🔷",
      color: "bg-purple-500",
      features: [".NET 6+ support", "Dependency injection", "Logging integration", "NuGet package"],
      requirements: ".NET 6.0+",
      installCommand: "dotnet add package Modelsnest",
      documentation: "/docs/csharp",
      github: "https://github.com/Modelsnest/Modelsnest-dotnet"
    },
    {
      name: "Go",
      version: "0.9.1",
      description: "High-performance Go SDK with context support and middleware",
      downloads: "12.3K",
      stars: "445",
      lastUpdated: "2 weeks ago",
      icon: "🐹",
      color: "bg-cyan-500",
      features: ["Context support", "Middleware system", "High performance", "Go modules"],
      requirements: "Go 1.19+",
      installCommand: "go get github.com/Modelsnest/Modelsnest-go",
      documentation: "/docs/go",
      github: "https://github.com/Modelsnest/Modelsnest-go"
    },
    {
      name: "PHP",
      version: "1.0.3",
      description: "Modern PHP SDK with Composer support and PSR standards",
      downloads: "15.7K",
      stars: "389",
      lastUpdated: "1 month ago",
      icon: "🐘",
      color: "bg-indigo-500",
      features: ["PSR standards", "Composer support", "Laravel integration", "Async support"],
      requirements: "PHP 8.0+",
      installCommand: "composer require Modelsnest/Modelsnest-php",
      documentation: "/docs/php",
      github: "https://github.com/Modelsnest/Modelsnest-php"
    }
  ]

  const codeExamples = {
    python: `import Modelsnest

# Initialize the client
client = Modelsnest.Client(api_key="your-api-key")

# Create a chat completion
response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "user", "content": "Hello, how are you?"}
    ]
)

print(response.choices[0].message.content)`,
    
    javascript: `import { Modelsnest } from 'Modelsnest';

// Initialize the client
const client = new Modelsnest({
  apiKey: 'your-api-key',
});

// Create a chat completion
const response = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { role: 'user', content: 'Hello, how are you?' }
  ],
});

console.log(response.choices[0].message.content);`,
    
    java: `import com.Modelsnest.ModelsnestClient;
import com.Modelsnest.models.ChatCompletionRequest;

// Initialize the client
ModelsnestClient client = new ModelsnestClient("your-api-key");

// Create a chat completion
ChatCompletionRequest request = ChatCompletionRequest.builder()
    .model("gpt-4")
    .messages(Arrays.asList(
        new Message("user", "Hello, how are you?")
    ))
    .build();

ChatCompletion response = client.chat().completions().create(request);
System.out.println(response.getChoices().get(0).getMessage().getContent());`
  }

  const communitySDKs = [
    { name: "Rust", description: "Community-maintained Rust SDK", stars: "234", lastCommit: "1 week ago" },
    { name: "Ruby", description: "Ruby gem with Rails integration", stars: "189", lastCommit: "2 weeks ago" },
    { name: "Swift", description: "iOS and macOS SDK", stars: "156", lastCommit: "3 weeks ago" },
    { name: "Kotlin", description: "Kotlin-first Android SDK", stars: "123", lastCommit: "1 month ago" }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Software Development Kits</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Official and community SDKs to help you integrate Modelsnest APIs into your applications quickly and easily.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search SDKs..."
                className="pl-10 pr-4 py-3"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-green-500 hover:bg-green-600">
                <Download className="w-4 h-4 mr-2" />
                Download All SDKs
              </Button>
              <Button variant="outline">
                <BookOpen className="w-4 h-4 mr-2" />
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Official SDKs */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Official SDKs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sdks.map((sdk) => (
            <Card key={sdk.name} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{sdk.icon}</span>
                    <div>
                      <CardTitle className="text-xl">{sdk.name}</CardTitle>
                      <CardDescription>v{sdk.version}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline">{sdk.lastUpdated}</Badge>
                </div>
                <CardDescription className="text-base">{sdk.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Features */}
                  <div>
                    <h4 className="font-medium text-sm mb-2">Key Features</h4>
                    <div className="flex flex-wrap gap-1">
                      {sdk.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>{sdk.downloads}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      <span>{sdk.stars}</span>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="text-sm">
                    <span className="text-muted-foreground">Requirements: </span>
                    <span className="font-medium">{sdk.requirements}</span>
                  </div>

                  {/* Install Command */}
                  <div className="bg-muted p-3 rounded-lg">
                    <code className="text-sm font-mono">{sdk.installCommand}</code>
                    <Button variant="ghost" size="sm" className="ml-2 h-6 w-6 p-0">
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <BookOpen className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Github className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Code Examples */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Quick Start Examples</h2>
        <Tabs defaultValue="python" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="java">Java</TabsTrigger>
          </TabsList>
          <TabsContent value="python" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Python SDK Example</CardTitle>
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm">{codeExamples.python}</code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="javascript" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>JavaScript SDK Example</CardTitle>
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm">{codeExamples.javascript}</code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="java" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Java SDK Example</CardTitle>
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm">{codeExamples.java}</code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Community SDKs */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Community SDKs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {communitySDKs.map((sdk) => (
            <Card key={sdk.name} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">{sdk.name}</CardTitle>
                <CardDescription>{sdk.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="w-4 h-4" />
                    <span>{sdk.stars}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{sdk.lastCommit}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Github className="w-4 h-4 mr-2" />
                    View on GitHub
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Additional Resources */}
      <div className="bg-muted/30 border-t border-border/20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Need Help with SDKs?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get support, contribute to our open-source SDKs, or request a new language
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline">
                <BookOpen className="w-4 h-4 mr-2" />
                SDK Documentation
              </Button>
              <Button variant="outline">
                <Play className="w-4 h-4 mr-2" />
                Video Tutorials
              </Button>
              <Button variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                Request New SDK
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
