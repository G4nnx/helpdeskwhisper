
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { ArticleCard, Article } from '@/components/kb/ArticleCard';
import { KnowledgeBaseCategories } from '@/components/kb/KnowledgeBaseCategories';
import { FAQ } from '@/components/kb/FAQ';
import { ArticleView } from '@/components/kb/ArticleView';

// Mock knowledge base articles
const mockArticles: Article[] = [
  {
    id: 'kb-001',
    title: 'How to Reset Your Password',
    excerpt: 'A step-by-step guide to reset your password when you cannot access your account.',
    content: `
# How to Reset Your Password

If you're having trouble accessing your account due to a forgotten password, follow these steps to reset it:

## Step 1: Navigate to the Login Page
Visit the login page and click on the "Forgot Password" link below the login form.

## Step 2: Enter Your Email
Enter the email address associated with your account and click "Submit".

## Step 3: Check Your Email
You'll receive an email with a password reset link. Check your inbox (and spam folder if necessary).

## Step 4: Create a New Password
Click the link in the email and follow the instructions to create a new password.

## Step 5: Login with Your New Password
Return to the login page and use your new password to access your account.

## Important Notes:
- Password reset links are valid for 24 hours only
- Choose a strong password that includes uppercase letters, numbers, and special characters
- If you don't receive the email within 10 minutes, try requesting another reset link
    `,
    categories: ['account', 'passwords', 'security'],
    author: {
      name: 'IT Support Team',
      avatar: 'https://ui-avatars.com/api/?name=IT+Support&background=36B37E&color=fff',
    },
    createdAt: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    updatedAt: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    helpfulCount: 124,
  },
  {
    id: 'kb-002',
    title: 'Troubleshooting Network Connectivity Issues',
    excerpt: 'Common solutions for network connectivity problems in the office environment.',
    content: `
# Troubleshooting Network Connectivity Issues

Network issues can disrupt your workflow. Here are some steps to identify and resolve common network problems.

## Basic Troubleshooting

1. **Check Physical Connections**
   - Ensure Ethernet cables are properly connected
   - Verify that Wi-Fi is enabled on your device

2. **Restart Your Device**
   - Sometimes a simple restart can resolve connectivity issues

3. **Check Wi-Fi Connection**
   - Make sure you're connected to the correct network
   - Verify the signal strength is adequate

## Advanced Troubleshooting

1. **Reset Network Settings**
   - Windows: Run Command Prompt as admin and type \`ipconfig /release\` followed by \`ipconfig /renew\`
   - Mac: Go to System Preferences > Network > Advanced > TCP/IP > Renew DHCP Lease

2. **Update Network Drivers**
   - Check for and install the latest network adapter drivers

3. **Disable VPN or Proxy**
   - Temporarily disable any VPN or proxy services to test connectivity

If issues persist after trying these steps, please contact the IT Support team with details about your problem.
    `,
    categories: ['network', 'connectivity', 'troubleshooting'],
    author: {
      name: 'Network Admin',
      avatar: 'https://ui-avatars.com/api/?name=Network+Admin&background=0D8ABC&color=fff',
    },
    createdAt: new Date(new Date().getTime() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
    updatedAt: new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    helpfulCount: 89,
  },
  {
    id: 'kb-003',
    title: 'Setting Up Email on Your Mobile Device',
    excerpt: 'How to configure your work email on iOS and Android devices.',
    content: `
# Setting Up Email on Your Mobile Device

Follow these instructions to set up your work email on your mobile device.

## For iOS Devices (iPhone/iPad)

1. **Open Settings and navigate to Mail**
   - Tap on "Accounts", then "Add Account"

2. **Select your email provider**
   - Choose Microsoft Exchange or Office 365 for company email
   - For other providers, select the appropriate option

3. **Enter your details**
   - Email: your full company email address
   - Password: your email password
   - Description: a name for this account (e.g., "Work Email")

4. **Configure server settings if prompted**
   - Server: mail.company.com
   - Domain: company.com
   - Username: your email username

## For Android Devices

1. **Open the Settings app and select "Accounts"**
   - Tap "Add account"

2. **Select email provider**
   - Choose Microsoft Exchange, Google Workspace, or other provider as appropriate

3. **Enter your credentials**
   - Email address: your full company email
   - Password: your email password

4. **Additional settings if needed**
   - Server: mail.company.com
   - Port: 443 (or as specified by IT)
   - Security type: SSL/TLS

If you encounter any issues during setup, please contact the IT Support team for assistance.
    `,
    categories: ['email', 'mobile', 'configuration'],
    author: {
      name: 'IT Support Team',
      avatar: 'https://ui-avatars.com/api/?name=IT+Support&background=36B37E&color=fff',
    },
    createdAt: new Date(new Date().getTime() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
    updatedAt: new Date(new Date().getTime() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    helpfulCount: 156,
  },
  {
    id: 'kb-004',
    title: 'Printer Setup and Troubleshooting',
    excerpt: 'Learn how to add new printers to your computer and resolve common printing issues.',
    content: `
# Printer Setup and Troubleshooting

This guide will help you connect to office printers and resolve common printing problems.

## Adding a New Printer

### Windows

1. **Open Settings > Devices > Printers & scanners**
2. **Click "Add a printer or scanner"**
3. **Select the printer from the list or use "The printer that I want isn't listed" option**
4. **Follow the on-screen instructions to complete setup**

### Mac

1. **Open System Preferences > Printers & Scanners**
2. **Click the + button**
3. **Select the printer from the list**
4. **Click "Add" to complete the setup**

## Common Printing Issues

### Paper Jams

1. Open the printer and carefully remove any jammed paper
2. Be sure to check all access points
3. Close all doors properly before attempting to print again

### Print Quality Issues

1. **Check toner/ink levels**
2. **Run printer cleaning utility**
   - Windows: Printer properties > Maintenance tab
   - Mac: System Preferences > Printers & Scanners > Options & Supplies > Utility

### Printer Offline

1. **Check physical connections**
2. **Restart the printer**
3. **Verify network connectivity**
4. **Set printer status to "Online"**
   - Windows: Devices and Printers > right-click printer > See what's printing > Printer menu > Use Printer Online
   - Mac: System Preferences > Printers & Scanners > Open Print Queue > Resume

If you need further assistance, please submit a ticket with specific details about your printer issue.
    `,
    categories: ['hardware', 'printers', 'troubleshooting'],
    author: {
      name: 'Tech Support',
      avatar: 'https://ui-avatars.com/api/?name=Tech+Support&background=FF5630&color=fff',
    },
    createdAt: new Date(new Date().getTime() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
    updatedAt: new Date(new Date().getTime() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
    helpfulCount: 208,
  },
  {
    id: 'kb-005',
    title: 'VPN Access Guide',
    excerpt: 'Instructions for setting up and using the company VPN for remote work.',
    content: `
# VPN Access Guide

Follow these instructions to set up and use the company VPN for secure remote access to internal resources.

## Initial VPN Setup

1. **Download the VPN Client**
   - Windows/Mac: Download from the company portal
   - Mobile: Get the app from your device's app store

2. **Install the Application**
   - Run the installer and follow the prompts
   - Accept any security permissions requested

3. **Configure the VPN**
   - Server: vpn.company.com
   - Port: 443
   - Protocol: SSL
   - Authentication: Username/Password + Certificate

## Connecting to the VPN

1. **Launch the VPN application**
2. **Enter your company credentials**
3. **Select the appropriate server location if prompted**
4. **Click "Connect"**
5. **Verify connection status before accessing internal resources**

## Troubleshooting VPN Issues

- **Connection Failures**
  - Check your internet connection
  - Verify your credentials are correct
  - Ensure your VPN client is up to date

- **Slow Performance**
  - Try connecting to a different server location
  - Close bandwidth-intensive applications
  - Check your base internet speed

- **Disconnections**
  - Update the VPN client
  - Check for firewall or antivirus interference
  - Contact IT if issues persist

## Security Best Practices

- Always disconnect from the VPN when not in use
- Do not use public Wi-Fi without VPN active
- Keep your device and VPN client updated

If you need assistance with VPN access, please contact the IT Support team.
    `,
    categories: ['security', 'remote work', 'vpn'],
    author: {
      name: 'Security Team',
      avatar: 'https://ui-avatars.com/api/?name=Security+Team&background=0D8ABC&color=fff',
    },
    createdAt: new Date(new Date().getTime() - 120 * 24 * 60 * 60 * 1000), // 120 days ago
    updatedAt: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    helpfulCount: 175,
  },
];

// FAQ items
const faqItems = [
  {
    question: "How do I reset my password?",
    answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page, or by contacting IT support through the Help Desk portal."
  },
  {
    question: "Who do I contact for IT support?",
    answer: "You can create a support ticket through the Help Desk portal, use the live chat feature during business hours, or call the IT support desk at extension 1234."
  },
  {
    question: "How do I connect to the company Wi-Fi?",
    answer: "Select the 'CompanyWiFi' network from your device's Wi-Fi settings, and enter your company email credentials when prompted."
  },
  {
    question: "What do I do if my computer is running slowly?",
    answer: "Try restarting your computer, closing unnecessary programs, and checking for software updates. If the issue persists, create a support ticket."
  },
  {
    question: "How do I request new software?",
    answer: "Create a ticket in the Help Desk system with the software name, version, business justification, and your manager's name for approval."
  },
  {
    question: "Can I access my work email from home?",
    answer: "Yes, you can access your work email through the web portal at mail.company.com or by setting up your email client with VPN connection."
  },
  {
    question: "How do I report a security incident?",
    answer: "Immediately contact the security team at security@company.com or call the emergency IT hotline at extension 5555."
  },
  {
    question: "How do I connect to a network printer?",
    answer: "Go to Settings > Devices > Printers & Scanners > Add Printer, and select the appropriate printer from the network list."
  }
];

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeTab, setActiveTab] = useState('articles');
  
  // Filter articles based on search query
  const filteredArticles = searchQuery.trim() === '' 
    ? mockArticles 
    : mockArticles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      
  const handleOpenArticle = (article: Article) => {
    setSelectedArticle(article);
  };
  
  const handleCloseArticle = () => {
    setSelectedArticle(null);
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">Knowledge Base</h1>
          <p className="text-muted-foreground">Find solutions, guides, and answers to common questions</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for articles, topics, or keywords..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="articles" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="articles">Articles & Guides</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          
          <TabsContent value="articles" className="space-y-4 mt-4">
            {selectedArticle ? (
              <ArticleView article={selectedArticle} onBack={handleCloseArticle} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <KnowledgeBaseCategories />
                
                <div className="col-span-2">
                  <h2 className="text-lg font-medium mb-4">
                    {searchQuery ? `Search Results (${filteredArticles.length})` : 'Popular Articles'}
                  </h2>
                  
                  {filteredArticles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredArticles.map((article) => (
                        <ArticleCard 
                          key={article.id}
                          article={article}
                          onClick={() => handleOpenArticle(article)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 border rounded-lg">
                      <p className="text-muted-foreground">No articles found matching your search criteria.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="faq" className="mt-4">
            <FAQ faqItems={faqItems} searchQuery={searchQuery} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default KnowledgeBase;
