export function imgSvgNode(title: string) {
    return (
        <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#bb9bf7"
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ffffff",
                borderRadius: 24,
                padding: "60px",
                width: 1180,
                height: 700,
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                position: "relative"
            }}>
                <div style={{
                    fontSize: 48,
                    color: "#695199",
                    fontWeight: 400,
                    position: "absolute",
                    top: 60,
                    left: 60,
                }}>
                    Ama-Log
                </div>

                <div
                    style={{
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '80px 60px 60px 60px',
                    }}>
                    <div
                        style={{
                        fontSize: 72,
                        color: '#333',
                        fontWeight: 600,
                        textAlign: 'center',
                        lineHeight: 1.3,
                    }}>
                        {title}
                    </div>
                </div>
            </div>
        </div>
    )
}