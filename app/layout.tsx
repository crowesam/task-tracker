export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StackProvider app={stackServerApp}>
          <StackTheme>
            {children}  {/* SessionWrapper removed */}
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  )
}